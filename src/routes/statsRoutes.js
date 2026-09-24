import express from 'express';
import { getDashboardStats, getAllUsers, updateUserRole, deleteUser } from '../controllers/statsController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.put('/users/:id/role', protect, adminOnly, updateUserRole);

router.delete('/users/:id', protect, adminOnly, deleteUser);

export default router;
