import Project from '../models/Project.js';
import ProjectRequest from '../models/ProjectRequest.js';

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });
    res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Requests API
export const submitProjectRequest = async (req, res) => {
  try {
    const { name, email, title, description, techStack, sourceCode, liveUrl } = req.body;
    if (!name || !email || !title || !description) {
      return res.status(400).json({ success: false, message: 'Name, email, title, and description are required' });
    }

    const techArray = Array.isArray(techStack)
      ? techStack
      : typeof techStack === 'string'
      ? techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const request = await ProjectRequest.create({
      name,
      email,
      title,
      description,
      techStack: techArray,
      sourceCode: sourceCode || '',
      liveUrl: liveUrl || '',
      status: 'pending',
    });

    res.status(201).json({
      success: true,
      message: 'Your project request has been submitted successfully! Our team will review it.',
      data: request,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProjectRequests = async (req, res) => {
  try {
    const requests = await ProjectRequest.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: requests.length, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveProjectRequest = async (req, res) => {
  try {
    const request = await ProjectRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });

    // Create published project
    const project = await Project.create({
      title: request.title,
      description: request.description,
      techStack: request.techStack,
      links: {
        github: request.sourceCode,
        live: request.liveUrl,
        demo: request.liveUrl,
      },
    });

    request.status = 'approved';
    await request.save();

    res.status(200).json({
      success: true,
      message: 'Project request approved and published to Projects list!',
      data: { request, project },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProjectRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await ProjectRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!request) return res.status(404).json({ success: false, message: 'Request not found' });
    res.status(200).json({ success: true, message: 'Status updated', data: request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProjectRequest = async (req, res) => {
  try {
    await ProjectRequest.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Request removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
