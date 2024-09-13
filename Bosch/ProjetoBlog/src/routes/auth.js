const express = require('express');
const AuthController = require('../controller/AuthController');
const route = express.Router();

route
    .post('/register', AuthController.verifyJWT, AuthController.register)
    .post('/login', AuthController.login)
    
module.exports = route;