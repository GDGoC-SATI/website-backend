import TeamMember from '../models/TeamMember.js';
import { broadcastRealtimeUpdate } from '../utils/realtimeService.js';

export const getTeam = async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.create(req.body);
    broadcastRealtimeUpdate('team', 'CREATE', member);
    res.status(201).json({ success: true, message: 'Team member added', data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    broadcastRealtimeUpdate('team', 'UPDATE', member);
    res.status(200).json({ success: true, message: 'Member updated', data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTeamMember = async (req, res) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Member not found' });
    broadcastRealtimeUpdate('team', 'DELETE', { id: req.params.id });
    res.status(200).json({ success: true, message: 'Member deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderTeamMembers = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'orderedIds array required' });
    }

    const updates = orderedIds.map((id, index) =>
      TeamMember.findByIdAndUpdate(id, { order: index })
    );
    await Promise.all(updates);

    const members = await TeamMember.find().sort({ order: 1 });
    broadcastRealtimeUpdate('team', 'REORDER', members);
    res.status(200).json({ success: true, message: 'Order updated', data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
