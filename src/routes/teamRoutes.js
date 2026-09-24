import express from 'express';
import {
  getTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  reorderTeamMembers,
} from '../controllers/teamController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getTeam);
router.post('/', protect, adminOnly, createTeamMember);
router.post('/reorder', protect, adminOnly, reorderTeamMembers);
router.put('/:id', protect, adminOnly, updateTeamMember);
router.delete('/:id', protect, adminOnly, deleteTeamMember);

export default router;
