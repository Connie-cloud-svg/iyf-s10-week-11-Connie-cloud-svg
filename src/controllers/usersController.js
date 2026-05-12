const User = require('../models/User');
const Post = require('../models/Post');

const getMe = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        next(error);
    }
};

const updateMe = async (req, res, next) => {
    try {
        const { username, email } = req.body;

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { username, email },
            { new: true, runValidators: true }
        );

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({ errors: messages });
        }
        next(error);
    }
};

const getUserPosts = async (req, res, next) => {
    try {
        const posts = await Post.find({ author: req.params.id })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        next(error);
    }
};

module.exports = { getMe, updateMe, getUserPosts };
