const mongoose = require('mongoose');
const Product = require('./ProductModel'); // Import the Product model

const ShopSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    phone: {
        type: Number,
        required: true
    },
    GSTNo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Shop', ShopSchema);
