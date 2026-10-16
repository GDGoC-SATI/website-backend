import { broadcastRealtimeUpdate } from '../utils/realtimeService.js';
import SiteSection from '../models/SiteSection.js';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const getSection = async (req, res) => {
  try {
    const section = await SiteSection.findOne({ sectionKey: req.params.key });
    if (!section) {
      return res.status(200).json({ success: true, data: null });
    }

    // Privacy filter for broadcast_notifications:
    // Inquiry replies must only be delivered if the authenticated user's email matches the recipient userEmail
    if (req.params.key === 'broadcast_notifications' && section.data?.broadcasts) {
      let requesterEmail = null;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
          const token = req.headers.authorization.split(' ')[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          const user = await User.findById(decoded.id).select('email');
          if (user?.email) {
            requesterEmail = user.email.toLowerCase().trim();
          }
        } catch {
          // Token invalid or expired; treat as unauthenticated
        }
      }

      const filteredBroadcasts = section.data.broadcasts.filter((b) => {
        const isReply =
          b.type === 'inquiry_reply' ||
          Boolean(b.userEmail) ||
          b.category?.toLowerCase().includes('inquiry') ||
          b.category?.toLowerCase().includes('response');

        if (isReply) {
          if (!requesterEmail || !b.userEmail) return false;
          return b.userEmail.toLowerCase().trim() === requesterEmail;
        }
        return true;
      });

      const sectionObj = section.toObject ? section.toObject() : { ...section };
      sectionObj.data = { ...sectionObj.data, broadcasts: filteredBroadcasts };
      return res.status(200).json({ success: true, data: sectionObj });
    }

    res.status(200).json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSections = async (req, res) => {
  try {
    const sections = await SiteSection.find();
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { title, description, data } = req.body;
    const section = await SiteSection.findOneAndUpdate(
      { sectionKey: req.params.key },
      {
        sectionKey: req.params.key,
        title,
        description,
        data,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    broadcastRealtimeUpdate('sections', 'UPDATE', { sectionKey: req.params.key });
    res.status(200).json({ success: true, message: 'Section updated', data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
