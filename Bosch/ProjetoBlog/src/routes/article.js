const express = require('express');
const ArticleController = require('../controller/ArticleController');
const route = express.Router();

route
    .post('/', ArticleController.create)
    .delete('/:id', ArticleController.delete)
    .post('/like/:id', ArticleController.likeArticle)
    .post('/comment/:id', ArticleController.commentArticle)
    .get('/comment/:id', ArticleController.getComments)


module.exports = route;