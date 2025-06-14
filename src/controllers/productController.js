const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../utils/errors');
const config = require('../config/config');

// In-memory database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Get all products with filtering and pagination
const getAllProducts = (req, res) => {
  const { category, page = 1, limit = config.pagination.defaultLimit } = req.query;
  
  let filteredProducts = [...products];
  
  // Apply category filter
  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }
  
  // Apply pagination
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  res.json({
    total: filteredProducts.length,
    page: parseInt(page),
    limit: parseInt(limit),
    products: paginatedProducts
  });
};

// Search products
const searchProducts = (req, res) => {
  const { query, category } = req.query;
  
  if (!query) {
    return res.status(400).json({
      error: 'ValidationError',
      message: 'Search query is required'
    });
  }

  let searchResults = [...products];
  
  // Apply category filter if provided
  if (category) {
    searchResults = searchResults.filter(p => p.category === category);
  }
  
  // Search in name and description
  const searchLower = query.toLowerCase();
  searchResults = searchResults.filter(p => 
    p.name.toLowerCase().includes(searchLower) || 
    p.description.toLowerCase().includes(searchLower)
  );
  
  res.json({
    total: searchResults.length,
    query,
    category: category || 'all',
    results: searchResults
  });
};

// Get product by ID
const getProductById = (req, res, next) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    return next(new NotFoundError('Product not found'));
  }
  
  res.json(product);
};

// Create new product
const createProduct = (req, res) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    
    // Basic validation
    if (!name || !description || !price || !category) {
      return res.status(400).json({
        error: 'ValidationError',
        message: 'Missing required fields'
      });
    }

    const newProduct = {
      id: uuidv4(),
      name,
      description,
      price: Number(price),
      category,
      inStock: inStock ?? true
    };
    
    products.push(newProduct);
    
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({
      error: 'ServerError',
      message: 'Failed to create product'
    });
  }
};

// Update product
const updateProduct = (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }
  
  const { name, description, price, category, inStock } = req.body;
  
  products[productIndex] = {
    ...products[productIndex],
    name: name ?? products[productIndex].name,
    description: description ?? products[productIndex].description,
    price: price ?? products[productIndex].price,
    category: category ?? products[productIndex].category,
    inStock: inStock ?? products[productIndex].inStock
  };
  
  res.json(products[productIndex]);
};

// Delete product
const deleteProduct = (req, res, next) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    return next(new NotFoundError('Product not found'));
  }
  
  products = products.filter(p => p.id !== req.params.id);
  res.status(204).send();
};

// Get product statistics
const getProductStats = (req, res) => {
  const stats = {
    totalProducts: products.length,
    categories: {},
    averagePrice: 0,
    inStock: 0
  };
  
  let totalPrice = 0;
  
  products.forEach(product => {
    // Count by category
    stats.categories[product.category] = (stats.categories[product.category] || 0) + 1;
    
    // Count in stock
    if (product.inStock) {
      stats.inStock++;
    }
    
    // Calculate total price for average
    totalPrice += product.price;
  });
  
  stats.averagePrice = totalPrice / products.length;
  
  res.json(stats);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductStats,
  searchProducts
}; 