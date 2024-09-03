const express = require('express');
const CommentController = require('../controller/CommentController');
const route = express.Router();

route
    .post('/:id', CommentController.commentArticle)
    .get('/:id', CommentController.getComments)

module.exports = route;