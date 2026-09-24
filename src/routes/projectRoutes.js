import express from 'express';
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  submitProjectRequest,
  getProjectRequests,
  approveProjectRequest,
  updateProjectRequestStatus,
  deleteProjectRequest,
} from '../controllers/projectController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Projects
router.get('/', getProjects);
router.post('/', protect, adminOnly, createProject);
router.put('/:id', protect, adminOnly, updateProject);
router.delete('/:id', protect, adminOnly, deleteProject);

// User Project Requests
router.post('/request', submitProjectRequest);
router.get('/requests', protect, adminOnly, getProjectRequests);
router.post('/requests/:id/approve', protect, adminOnly, approveProjectRequest);
router.put('/requests/:id/status', protect, adminOnly, updateProjectRequestStatus);
router.delete('/requests/:id', protect, adminOnly, deleteProjectRequest);

export default router;
