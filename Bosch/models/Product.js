const mongoose = require('mongoose');

const Product = mongoose.model('Product', {
    name: String,
    description: String,
    color: Array,
    value: Number,
    qtd: Number
});

module.exports = Product;