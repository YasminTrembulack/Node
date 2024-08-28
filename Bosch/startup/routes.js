const bodyParser = require('body-parser');
const person = require('../routes/person');

module.exports = (app) => {
    app
        .use(bodyParser.json())
        .use("/api/person", person);
}