const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    fileUrl: {
        type: String
    },
    fileType: {
        type: String
    },
    reactions: {
        like: { type: Number, default: 0 },
        love: { type: Number, default: 0 },
        idea: { type: Number, default: 0 }
    },
    lastEdited: {
        type: Date
    }
}, {
    // This automatically adds `createdAt` and `updatedAt` timestamps!
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);