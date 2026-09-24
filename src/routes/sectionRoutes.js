import express from 'express';
import { getSection, getAllSections, updateSection } from '../controllers/sectionController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAllSections);
router.get('/:key', getSection);
router.put('/:key', protect, adminOnly, updateSection);

export default router;
