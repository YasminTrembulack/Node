const bodyParser = require('body-parser');
const person = require('../routes/person');
const auth = require('../routes/auth');
const test = require('../routes/test')

module.exports = (app) => {
    app
        .use(bodyParser.json())
        .use("/api/person", person)
        .use('/api/auth', auth)
        .use('/api/forms', test)
}