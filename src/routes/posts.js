const express = require('express');
const router = express.Router();
const postsController = require('../controllers/postsController');
const commentsController = require('../controllers/commentsController');
const { protect, optionalAuth } = require('../middleware/auth');

// Public routes
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);

module.exports = router;