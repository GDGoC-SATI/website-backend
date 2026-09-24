import express from 'express';
import {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
  addImageToAlbum,
  removeImageFromAlbum,
  reorderAlbums,
} from '../controllers/galleryController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getAlbums);
router.post('/', protect, adminOnly, createAlbum);
router.post('/reorder', protect, adminOnly, reorderAlbums);
router.put('/:id', protect, adminOnly, updateAlbum);
router.delete('/:id', protect, adminOnly, deleteAlbum);
router.post('/:id/images', protect, adminOnly, addImageToAlbum);
router.delete('/:id/images', protect, adminOnly, removeImageFromAlbum);

export default router;
