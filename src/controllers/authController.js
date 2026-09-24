import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import Otp from '../models/Otp.js';
import { sendOtpEmail } from '../utils/emailService.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const generateNumericOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateUniqueUsername = async (email) => {
  const baseUsername = email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
  let username = baseUsername || 'user';
  let count = 1;
  while (await User.findOne({ username })) {
    username = `${baseUsername}${count++}`;
  }
  return username;
};

// 1. Send OTP for Signup
export const sendSignupOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const cleanEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists. Please log in.' });
    }

    const otp = generateNumericOtp();

    // Delete any pending signup OTPs for this email
    await Otp.deleteMany({ email: cleanEmail, purpose: 'signup' });

    // Store OTP with temporary signup data (valid for 10 minutes)
    await Otp.create({
      email: cleanEmail,
      otp,
      purpose: 'signup',
      tempData: {
        name: name.trim(),
        password,
      },
    });

    // Send email
    await sendOtpEmail({
      to: cleanEmail,
      otp,
      purpose: 'signup',
    });

    res.status(200).json({
      success: true,
      message: 'Verification code sent to your email. Please check your inbox.',
    });
  } catch (error) {
    console.error('[sendSignupOtp error]:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to send verification email' });
  }
};

// 2. Verify Signup OTP & Create Account
export const verifySignupOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and verification code' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    const otpDoc = await Otp.findOne({
      email: cleanEmail,
      otp: cleanOtp,
      purpose: 'signup',
    });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code. Please request a new code.' });
    }

    // Double check email isn't taken in between
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      await Otp.deleteMany({ email: cleanEmail, purpose: 'signup' });
      return res.status(400).json({ success: false, message: 'An account with this email already exists. Please log in.' });
    }

    const { name, password } = otpDoc.tempData;
    const username = await generateUniqueUsername(cleanEmail);
    const isAdmin = cleanEmail === (process.env.ADMIN_EMAIL || '').toLowerCase();

    const user = await User.create({
      name,
      username,
      email: cleanEmail,
      password,
      role: isAdmin ? 'admin' : 'user',
    });

    // Cleanup OTP
    await Otp.deleteMany({ email: cleanEmail, purpose: 'signup' });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        socials: user.socials || {},
      },
    });
  } catch (error) {
    console.error('[verifySignupOtp error]:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to verify code' });
  }
};

// 3. Login with Email & Password
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    // If user registered via Google and has no password yet
    if (!user.password) {
      return res.status(400).json({
        success: false,
        message: 'This account was created via Google. Please log in with Google, use Email OTP, or use "Forgot password" to set a password.',
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        socials: user.socials || {},
      },
    });
  } catch (error) {
    console.error('[login error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 4. Send OTP for Login
export const sendLoginOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your email address' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email. Please check your email or create an account first.',
      });
    }

    const otp = generateNumericOtp();

    // Delete existing login OTPs for this email
    await Otp.deleteMany({ email: cleanEmail, purpose: 'login' });

    await Otp.create({
      email: cleanEmail,
      otp,
      purpose: 'login',
    });

    await sendOtpEmail({
      to: cleanEmail,
      otp,
      purpose: 'login',
    });

    res.status(200).json({
      success: true,
      message: 'Login code sent to your email. Please check your inbox.',
    });
  } catch (error) {
    console.error('[sendLoginOtp error]:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to send login code' });
  }
};

// 5. Verify Login OTP
export const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Please provide email and login code' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    const otpDoc = await Otp.findOne({
      email: cleanEmail,
      otp: cleanOtp,
      purpose: 'login',
    });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: 'Invalid or expired login code. Please request a new code.' });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    // Delete OTP
    await Otp.deleteMany({ email: cleanEmail, purpose: 'login' });

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        socials: user.socials || {},
      },
    });
  } catch (error) {
    console.error('[verifyLoginOtp error]:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to verify login code' });
  }
};

// 6. Send OTP for Forgot Password
export const sendForgotPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide your email address' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: cleanEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'No account found with this email address.' });
    }

    const otp = generateNumericOtp();

    await Otp.deleteMany({ email: cleanEmail, purpose: 'forgot_password' });

    await Otp.create({
      email: cleanEmail,
      otp,
      purpose: 'forgot_password',
    });

    await sendOtpEmail({
      to: cleanEmail,
      otp,
      purpose: 'forgot_password',
    });

    res.status(200).json({
      success: true,
      message: 'Password reset code sent to your email. Please check your inbox.',
    });
  } catch (error) {
    console.error('[sendForgotPasswordOtp error]:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to send reset code' });
  }
};

// 7. Reset Password with OTP
export const resetPasswordWithOtp = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, message: 'Please provide email, verification code, and new password' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const cleanOtp = otp.toString().trim();

    const otpDoc = await Otp.findOne({
      email: cleanEmail,
      otp: cleanOtp,
      purpose: 'forgot_password',
    });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code. Please request a new code.' });
    }

    const user = await User.findOne({ email: cleanEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User account not found' });
    }

    user.password = newPassword;
    await user.save();

    await Otp.deleteMany({ email: cleanEmail, purpose: 'forgot_password' });

    res.status(200).json({
      success: true,
      message: 'Password has been reset successfully. You can now log in with your new password.',
    });
  } catch (error) {
    console.error('[resetPasswordWithOtp error]:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to reset password' });
  }
};

// 8. Google OAuth (Unified Account Linking)
export const googleAuth = async (req, res) => {
  try {
    let email, name, avatar, googleId;

    // Check if ID token credential provided from Google Identity Services
    if (req.body.credential) {
      try {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        const ticket = await client.verifyIdToken({
          idToken: req.body.credential,
          audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        email = payload.email;
        name = payload.name;
        avatar = payload.picture;
        googleId = payload.sub;
      } catch (tokenErr) {
        console.warn('[googleAuth] Google token verification failed, falling back to body params:', tokenErr.message);
        email = req.body.email;
        name = req.body.name;
        avatar = req.body.avatar;
        googleId = req.body.googleId;
      }
    } else {
      email = req.body.email;
      name = req.body.name;
      avatar = req.body.avatar;
      googleId = req.body.googleId;
    }

    if (!email) {
      return res.status(400).json({ success: false, message: 'Google account email is required' });
    }

    const cleanEmail = email.toLowerCase().trim();
    let user = await User.findOne({ email: cleanEmail });
    const isAdmin = cleanEmail === (process.env.ADMIN_EMAIL || '').toLowerCase();

    if (!user) {
      // Create new user
      const username = await generateUniqueUsername(cleanEmail);
      user = await User.create({
        name: name || cleanEmail.split('@')[0],
        username,
        email: cleanEmail,
        avatar: avatar || '',
        googleId: googleId || `google_${Date.now()}`,
        role: isAdmin ? 'admin' : 'user',
      });
    } else {
      // Unified account: update googleId and avatar to Google photo
      if (googleId) user.googleId = googleId;
      if (avatar) user.avatar = avatar;
      if (isAdmin && user.role !== 'admin') user.role = 'admin';
      await user.save();
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Google authentication successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        socials: user.socials || {},
      },
    });
  } catch (error) {
    console.error('[googleAuth error]:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 9. Get Google Client ID
export const getGoogleClientId = async (req, res) => {
  res.status(200).json({
    success: true,
    clientId: process.env.GOOGLE_CLIENT_ID || '',
  });
};

// Legacy direct signup (kept as fallback)
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password' });
    }

    const cleanEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: cleanEmail });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const username = await generateUniqueUsername(cleanEmail);
    const isAdmin = cleanEmail === (process.env.ADMIN_EMAIL || '').toLowerCase();

    const user = await User.create({
      name,
      username,
      email: cleanEmail,
      password,
      role: isAdmin ? 'admin' : 'user',
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        socials: user.socials || {},
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const { name, username, bio, avatar, password, socials } = req.body;
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio;
    if (avatar) user.avatar = avatar;
    if (socials && typeof socials === 'object') {
      user.socials = {
        github: socials.github !== undefined ? socials.github.trim() : (user.socials?.github || ''),
        linkedin: socials.linkedin !== undefined ? socials.linkedin.trim() : (user.socials?.linkedin || ''),
        twitter: socials.twitter !== undefined ? socials.twitter.trim() : (user.socials?.twitter || ''),
        instagram: socials.instagram !== undefined ? socials.instagram.trim() : (user.socials?.instagram || ''),
        website: socials.website !== undefined ? socials.website.trim() : (user.socials?.website || ''),
      };
    }

    if (username && username !== user.username) {
      const exists = await User.findOne({ username: username.toLowerCase() });
      if (exists && exists._id.toString() !== user._id.toString()) {
        return res.status(400).json({ success: false, message: 'Username is already taken' });
      }
      user.username = username.toLowerCase();
    }

    if (password) {
      user.password = password;
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        bio: user.bio,
        socials: user.socials,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username.toLowerCase() }).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
