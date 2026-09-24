import express from 'express';
import {
  submitQuery,
  getQueries,
  updateQueryStatus,
  deleteQuery,
} from '../controllers/contactController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitQuery);
router.get('/', protect, adminOnly, getQueries);
router.put('/:id/status', protect, adminOnly, updateQueryStatus);
router.delete('/:id', protect, adminOnly, deleteQuery);

export default router;
