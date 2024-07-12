const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

// Route for creating a new shop
router.post('/shop', shopController.createShop);

// Route for updating an existing shop
router.put('/shop/:id', shopController.updateShop);

// Route for getting all shops with products
router.get('/shops', shopController.getAllShops);

// Route for adding a product to a shop
router.post('/shop/:shopId/products', shopController.addProductToShop);

router.get('/:shopId/products', shopController.getAllProductsForShop);
router.put('/shop/:shopId/products/:productId', shopController.updateProductInShop);

module.exports = router;
