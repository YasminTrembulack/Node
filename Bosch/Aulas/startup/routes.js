const bodyParser = require('body-parser');
const person = require('../routes/person');
const auth = require('../routes/auth');

module.exports = (app) => {
    app
        .use(bodyParser.json())
        .use("/api/person", person)
        .use('/api/auth', auth)
}