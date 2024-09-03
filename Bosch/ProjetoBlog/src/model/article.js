const mongoose = require('mongoose');

const Article = mongoose.model('Article', 
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
            minlength: 3
        },
        text: {
            type: String,
            required: true,
            minlength: 15
        },
        author: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Author',
            required: true
        },
        category: {
            type: String,
            require: true
        },
        tags: [{
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
            require: false
        }],
        likes: {
            type: [String], 
            required: false
        },
        createdAt: {
            type: Date,
            required: true
        },
        updatedAt: {
            type: Date,
            required: false
        },
        removedAt: {
            type: Date,
            required: false
        }
    })
);

module.exports = Article;