const asyncHandler = require('express-async-handler');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

// @desc    Get all blog posts
// @route   GET /api/blog
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await BlogPost.find()
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json(posts);
});

// @desc    Get single blog post with comments
// @route   GET /api/blog/:id
// @access  Public
const getPostById = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id).populate('author', 'username');

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comments = await Comment.find({ post: post._id })
    .populate('author', 'username')
    .sort({ createdAt: -1 });

  res.json({ ...post.toObject(), comments });
});

// @desc    Create a blog post
// @route   POST /api/blog
// @access  Private
const createPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400);
    throw new Error('Title and content are required');
  }

  const post = await BlogPost.create({
    title,
    content,
    author: req.user._id
  });

  const populatedPost = await BlogPost.findById(post._id).populate('author', 'username');
  res.status(201).json(populatedPost);
});

// @desc    Update a blog post
// @route   PUT /api/blog/:id
// @access  Private + Author only
const updatePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to update this post');
  }

  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;

  const updatedPost = await post.save();
  const populated = await BlogPost.findById(updatedPost._id).populate('author', 'username');
  res.json(populated);
});

// @desc    Delete a blog post
// @route   DELETE /api/blog/:id
// @access  Private + Author only
const deletePost = asyncHandler(async (req, res) => {
  const post = await BlogPost.findById(req.params.id);

  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post.author.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('Not authorized to delete this post');
  }

  // Also delete associated comments
  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();

  res.json({ message: 'Post and its comments removed' });
});

// @desc    Get comments for a post
// @route   GET /api/blog/:postId/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('author', 'username')
    .sort({ createdAt: -1 });
  res.json(comments);
});

// @desc    Create a comment
// @route   POST /api/blog/:postId/comments
// @access  Private
const createComment = asyncHandler(async (req, res) => {
  const { body } = req.body;

  if (!body) {
    res.status(400);
    throw new Error('Comment body is required');
  }

  const post = await BlogPost.findById(req.params.postId);
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }

  const comment = await Comment.create({
    body,
    author: req.user._id,
    post: req.params.postId
  });

  const populated = await Comment.findById(comment._id).populate('author', 'username');
  res.status(201).json(populated);
});

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  getComments,
  createComment
};
