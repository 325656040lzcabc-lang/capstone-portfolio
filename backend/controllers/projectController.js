const asyncHandler = require('express-async-handler');
const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate('user', 'username').sort({ createdAt: -1 });
  res.json(projects);
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate('user', 'username');
  if (project) {
    res.json(project);
  } else {
    res.status(404);
    throw new Error('Project not found');
  }
});

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, repoUrl, liveUrl } = req.body;

  if (!title || !description) {
    res.status(400);
    throw new Error('Title and description are required');
  }

  const project = await Project.create({
    title,
    description,
    imageUrl: imageUrl || '',
    repoUrl: repoUrl || '',
    liveUrl: liveUrl || '',
    user: req.user._id
  });

  res.status(201).json(project);
});

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  // Only owner can update
  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this project');
  }

  project.title = req.body.title || project.title;
  project.description = req.body.description || project.description;
  project.imageUrl = req.body.imageUrl !== undefined ? req.body.imageUrl : project.imageUrl;
  project.repoUrl = req.body.repoUrl !== undefined ? req.body.repoUrl : project.repoUrl;
  project.liveUrl = req.body.liveUrl !== undefined ? req.body.liveUrl : project.liveUrl;

  const updatedProject = await project.save();
  res.json(updatedProject);
});

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (project.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this project');
  }

  await project.deleteOne();
  res.json({ message: 'Project removed' });
});

module.exports = {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
};
