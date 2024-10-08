const express = require('express');
const AuthController = require('../controller/AuthController');
const router = express.Router();

router
    .post('/register', AuthController.register)
    .post('/login', AuthController.login)
    .delete('/delete/:id', AuthController.verifyJWT, AuthController.delete)
    
module.exports = router;