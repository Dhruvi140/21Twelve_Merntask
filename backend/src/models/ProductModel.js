const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);
