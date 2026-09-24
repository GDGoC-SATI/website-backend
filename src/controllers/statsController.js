import User from '../models/User.js';
import Project from '../models/Project.js';
import ProjectRequest from '../models/ProjectRequest.js';
import Event from '../models/Event.js';
import TeamMember from '../models/TeamMember.js';
import Alumni from '../models/Alumni.js';
import ContactQuery from '../models/ContactQuery.js';

export const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProjects,
      pendingRequests,
      totalEvents,
      totalTeam,
      totalAlumni,
      totalQueries,
      unreadQueries,
      recentUsers,
      recentRequests,
      recentQueries,
    ] = await Promise.all([
      User.countDocuments(),
      Project.countDocuments(),
      ProjectRequest.countDocuments({ status: 'pending' }),
      Event.countDocuments(),
      TeamMember.countDocuments(),
      Alumni.countDocuments(),
      ContactQuery.countDocuments(),
      ContactQuery.countDocuments({ status: 'unread' }),
      User.find().select('-password').sort({ createdAt: -1 }).limit(5),
      ProjectRequest.find().sort({ createdAt: -1 }).limit(5),
      ContactQuery.find().sort({ createdAt: -1 }).limit(5),
    ]);

    res.status(200).json({
      success: true,
      data: {
        counts: {
          users: totalUsers,
          projects: totalProjects,
          pendingRequests,
          events: totalEvents,
          team: totalTeam,
          alumni: totalAlumni,
          queries: totalQueries,
          unreadQueries,
        },
        recentUsers,
        recentRequests,
        recentQueries,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User role updated', data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
