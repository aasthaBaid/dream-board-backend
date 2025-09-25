const router = require('express').Router();
const Post = require('../models/Post.model.js');

// --- GET: Fetch all posts ---
// Path: /api/posts/
router.get('/', async (req, res) => {
    try {
        // Find all posts and sort them: newest first
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- POST: Add a new post ---
// Path: /api/posts/add
// (NOTE: This only handles TEXT for now. File uploads are a later step.)
router.post('/add', async (req, res) => {
    const newPost = new Post({
        text: req.body.text,
        reactions: { like: 0, love: 0, idea: 0 }
        // We will add fileUrl later
    });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// --- DELETE: Delete a post ---
// Path: /api/posts/delete/:id
router.delete('/delete/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        res.json(deletedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PATCH: Edit a post ---
// Path: /api/posts/edit/:id
router.patch('/edit/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.newText,
                lastEdited: Date.now()
            },
            { new: true } // This returns the updated document
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// --- PATCH: Update a reaction ---
// Path: /api/posts/reaction/:id
router.patch('/reaction/:id', async (req, res) => {
    try {
        const reactionKey = `reactions.${req.body.reactionType}`; // e.g. "reactions.like"

        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { $inc: { [reactionKey]: 1 } }, // Increment the specific reaction
            { new: true }
        );
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;