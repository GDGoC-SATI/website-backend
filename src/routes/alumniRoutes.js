import express from 'express';
import {
  getAlumni,
  createAlumni,
  updateAlumni,
  deleteAlumni,
  reorderAlumni,
} from '../controllers/alumniController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAlumni);
router.post('/', protect, adminOnly, createAlumni);
router.post('/reorder', protect, adminOnly, reorderAlumni);
router.put('/:id', protect, adminOnly, updateAlumni);
router.delete('/:id', protect, adminOnly, deleteAlumni);

export default router;
