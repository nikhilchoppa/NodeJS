const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    topic: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    posted_at: {
        type: Date,
        default: Date.now,
    },
    posted_by: {
        type: String,
        required: true,
    },
    views: {
        type: Number,
    },
});

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;