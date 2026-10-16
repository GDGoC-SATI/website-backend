import { broadcastRealtimeUpdate } from '../utils/realtimeService.js';
﻿import ContactQuery from '../models/ContactQuery.js';
import SiteSection from '../models/SiteSection.js';
import { sendInquiryReplyEmail } from '../utils/emailService.js';

export const submitQuery = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    if (!firstName || !email || !message) {
      return res.status(400).json({ success: false, message: 'First name, email, and message are required' });
    }

    const query = await ContactQuery.create({
      firstName,
      lastName: lastName || '',
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    broadcastRealtimeUpdate('contact', 'CREATE', query);
    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
      data: query,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQueries = async (req, res) => {
  try {
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: queries.length, data: queries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQueryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const query = await ContactQuery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!query) return res.status(404).json({ success: false, message: 'Query not found' });
    res.status(200).json({ success: true, message: 'Status updated', data: query });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const replyQuery = async (req, res) => {
  try {
    const { replyMessage, adminName, subject } = req.body;

    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({ success: false, message: 'Reply message is required' });
    }

    const query = await ContactQuery.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ success: false, message: 'Inquiry not found' });
    }

    const trimmedReply = replyMessage.trim();
    const effectiveAdmin = adminName || req.user?.name || 'GDG on Campus SATI Core Team';
    const repliedAt = new Date();

    // 1. Analyze and format subject
    const rawSubject = (query.subject || 'General Inquiry').trim();
    const emailSubject = subject?.trim() || (rawSubject.toLowerCase().startsWith('re:') ? rawSubject : `Re: ${rawSubject} - GDG on Campus SATI Vidisha`);

    // 2. Update inquiry document
    query.status = 'replied';
    query.adminReply = trimmedReply;
    query.adminName = effectiveAdmin;
    query.repliedAt = repliedAt;
    await query.save();

    // 3. Dispatch Email via Gmail
    let emailStatus = { sent: false };
    try {
      const mailInfo = await sendInquiryReplyEmail({
        to: query.email,
        recipientName: `${query.firstName} ${query.lastName}`.trim(),
        originalQuery: query.message,
        replyMessage: trimmedReply,
        subject: emailSubject,
        adminName: effectiveAdmin,
      });
      emailStatus = { sent: true, messageId: mailInfo.messageId };
    } catch (mErr) {
      console.warn('[ContactController] Email dispatch warning:', mErr.message);
      emailStatus = { sent: false, error: mErr.message };
    }

    // 4. Create in-app notification targeted to this user's email
    try {
      const hasGreeting = /^(dear|hi|hello|hey|namaste|greetings)\b/i.test(trimmedReply);
      const notificationMessage = hasGreeting
        ? trimmedReply
        : `Dear ${query.firstName || 'Member'},\n\n${trimmedReply}`;

      const newNotification = {
        id: `reply-${query._id}-${Date.now()}`,
        title: `Reply: ${query.subject || 'Community Inquiry'}`,
        category: 'Inquiry Response',
        message: notificationMessage,
        priority: 'Important',
        type: 'inquiry_reply',
        userEmail: query.email.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        author: effectiveAdmin,
      };

      const existingSection = await SiteSection.findOne({ sectionKey: 'broadcast_notifications' });
      const currentBroadcasts = existingSection?.data?.broadcasts || [];
      const updatedBroadcasts = [newNotification, ...currentBroadcasts.filter(b => b.id !== newNotification.id)];

      await SiteSection.findOneAndUpdate(
        { sectionKey: 'broadcast_notifications' },
        {
          sectionKey: 'broadcast_notifications',
          title: 'Broadcast Notifications',
          description: 'System-wide announcements and updates for all users',
          data: { broadcasts: updatedBroadcasts },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } catch (nErr) {
      console.warn('[ContactController] In-app notification creation error:', nErr.message);
    }

    broadcastRealtimeUpdate('contact', 'UPDATE', query);
    broadcastRealtimeUpdate('sections', 'UPDATE', { sectionKey: 'broadcast_notifications' });
    res.status(200).json({
      success: true,
      message: `Reply sent successfully to ${query.firstName} via notifications and email!`,
      data: query,
      emailStatus,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteQuery = async (req, res) => {
  try {
    await ContactQuery.findByIdAndDelete(req.params.id);
    broadcastRealtimeUpdate('contact', 'DELETE', { id: req.params.id });
    res.status(200).json({ success: true, message: 'Query deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
