const bodyParser = require('body-parser');
const person = require('./routes/person');
const cars = require('./routes/cars');


module.exports = (app) => {
    app.use( bodyParser.json(), person),
    app.use( bodyParser.json(), cars)
}

