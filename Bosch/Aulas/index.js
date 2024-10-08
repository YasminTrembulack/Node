const express = require('express');
const router = require('./startup/routes');
const app = express();
const cors = require('cors');

require('./startup/db')();
require('./startup/routes')(app);

app.use(cors({
        origin: '*'
}));

const port = 8080;

const server = app.listen(port, () => 
        console.log(`Listening on port http://localhost:${port}`
));

module.exports = server;