const express = require('express');
const router = express.Router();
const PersonController = require("../controller/Person")

// https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

router
    .post('/', PersonController.create)
    .get('/', PersonController.getAll)
    .get('/:id', PersonController.getOne);

module.exports = router