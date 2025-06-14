const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { validateProduct } = require('../middleware/validation');
const authenticate = require('../middleware/auth');

// Public routes
router.get('/', productController.getAllProducts);
router.get('/search', productController.searchProducts);
router.get('/stats', productController.getProductStats);
router.get('/:id', productController.getProductById);

// Protected routes
router.post('/', authenticate, validateProduct, productController.createProduct);
router.put('/:id', authenticate, validateProduct, productController.updateProduct);
router.delete('/:id', authenticate, productController.deleteProduct);

module.exports = router; 