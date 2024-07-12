const Shop = require('../models/ShopModel');
const Product = require('../models/ProductModel')

// Create a new shop
const createShop = async (req, res) => {
    const { name, address, owner, phone, GSTNo } = req.body;
    try {
        const newShop = new Shop({
            name,
            address,
            owner,
            phone,
            GSTNo
        });
        const savedShop = await newShop.save();
        res.status(201).json(savedShop);
    } catch (error) {
        console.error('Error creating shop:', error.message);
        res.status(500).json({ error: 'Failed to create shop', message: error.message });
    }
};

// Update an existing shop
const updateShop = async (req, res) => {
    const { id } = req.params;
    const { name, address, owner, phone, GSTNo } = req.body;

    try {
        const updatedShop = await Shop.findByIdAndUpdate(
            id,
            { name, address, owner, phone, GSTNo },
            { new: true, runValidators: true } // Ensure Mongoose runs validators on update
        );

        if (!updatedShop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.json(updatedShop); // Return updated shop object on success
    } catch (error) {
        console.error('Error updating shop:', error.message);
        res.status(500).json({ error: 'Failed to update shop' });
    }
};



// Get all shops with populated products
const getAllShops = async (req, res) => {
    try {
        const shops = await Shop.find().populate('products');
        res.json(shops);
    } catch (error) {
        console.error('Error fetching shops:', error);
        res.status(500).json({ error: 'Failed to fetch shops' });
    }
};

// Add a product to a shop
const addProductToShop = async (req, res) => {
    const { shopId } = req.params;
    const { productname, description, price } = req.body;
    try {
        // Create a new product
        const newProduct = new Product({
            productname,
            description,
            price
        });
        
        // Save the new product
        const savedProduct = await newProduct.save();
        
        // Find the shop by ID
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }
        
        // Push the new product's ID to the shop's products array
        shop.products.push(savedProduct._id);
        
        // Save the updated shop
        await shop.save();
        
        // Respond with the saved product details
        res.status(201).json(savedProduct);
    } catch (error) {
        console.error('Error adding product to shop:', error.message);
        res.status(500).json({ error: 'Failed to add product to shop', message: error.message });
    }
};
// Get all products for a specific shop
const getAllProductsForShop = async (req, res) => {
    const { shopId } = req.params;

    try {
        const shop = await Shop.findById(shopId).populate('products'); // Populate products array in shop

        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        res.json(shop.products); // Return products associated with the shop
    } catch (error) {
        console.error('Error fetching products for shop:', error.message);
        res.status(500).json({ error: 'Failed to fetch products for shop' });
    }
};
// Update a product in a shop
const updateProductInShop = async (req, res) => {
    const { shopId, productId } = req.params;
    const { productname, description, price } = req.body;

    try {
        // Find the shop by ID
        const shop = await Shop.findById(shopId);
        if (!shop) {
            return res.status(404).json({ error: 'Shop not found' });
        }

        // Find the product by ID within the shop's products array
        const product = await Product.findByIdAndUpdate(
            productId,
            { productname, description, price },
            { new: true, runValidators: true } // Ensure Mongoose runs validators on update
        );

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Optionally, you can update product details in the shop's products array here
        // Example: product.productname = productname; product.description = description; ...

        // Save the updated product
        await product.save();

        res.json(product); // Return updated product object on success
    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ error: 'Failed to update product', message: error.message });
    }
};
module.exports = {
    createShop,
    updateShop,
    getAllShops,
    addProductToShop,
    getAllProductsForShop,
    updateProductInShop
};
