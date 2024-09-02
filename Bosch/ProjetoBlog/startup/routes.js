const express = require('express');
const article = require('../src/routes/article');
const author = require('../src/routes/author');
const auth = require('../src/routes/auth')
const AuthController =  require('../src/controller/AuthController')

module.exports = function(app) {
    app
        .use(express.json())
        .use('/api/article', AuthController.verifyJWT, article)
        .use('/api/author', AuthController.verifyJWT, author)
        .use('/api/auth', auth)

}