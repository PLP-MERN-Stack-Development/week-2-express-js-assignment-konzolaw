// server.js - Week 2 Assignment: Organized Express.js REST API
require('dotenv').config();

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 3000;

// ==============================
// 🌐 GLOBAL MIDDLEWARE
// ==============================

// Parse incoming JSON bodies
app.use(bodyParser.json());

// Request logger middleware
app.use((req, res, next) => {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
});


//  Authentication Middleware
const API_KEY = process.env.API_KEY || 'secret-api-key'; // fallback for development

// Define public routes that don't need API key
const PUBLIC_ROUTES = ['/', '/favicon.ico'];

app.use((req, res, next) => {
  // Allow public routes
  if (PUBLIC_ROUTES.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers['authorization'];

  // Handle missing header
  if (!authHeader) {
    return res.status(401).json({ error: 'Unauthorized. No API key provided.' });
  }

  // Accept both "Bearer <token>" and raw key
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7)
    : authHeader;

  if (token === API_KEY) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Invalid API key.' });
  }
});





// ==============================
// "DATABASE"
// ==============================
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true,
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false,
  },
];

// ==============================
// 🚀 ROUTES
// ==============================

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products');
});

// GET /api/products (with optional pagination and filtering)
app.get('/api/products', (req, res) => {
  let { page = 1, limit = 10, category } = req.query;
  page = parseInt(page);
  limit = parseInt(limit);

  let filtered = products;

  if (category) {
    filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
  }

  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  res.json({
    page,
    total: filtered.length,
    products: paginated,
  });
});

// GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// POST /api/products
app.post('/api/products', (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  if (!name || !description || typeof price !== 'number' || !category) {
    return res.status(400).json({ error: 'Missing or invalid fields' });
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock: inStock !== undefined ? inStock : true,
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT /api/products/:id
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });

  const { name, description, price, category, inStock } = req.body;

  if (
    (name && typeof name !== 'string') ||
    (description && typeof description !== 'string') ||
    (price && typeof price !== 'number') ||
    (category && typeof category !== 'string') ||
    (inStock !== undefined && typeof inStock !== 'boolean')
  ) {
    return res.status(400).json({ error: 'Invalid input types' });
  }

  // Only update provided fields
  if (name) product.name = name;
  if (description) product.description = description;
  if (price !== undefined) product.price = price;
  if (category) product.category = category;
  if (inStock !== undefined) product.inStock = inStock;

  res.json(product);
});

// DELETE /api/products/:id
app.delete('/api/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const deleted = products.splice(index, 1)[0];
  res.status(200).json({ message: 'Product deleted', product: deleted });
});

// GET /api/products/search?query=keyboard
app.get('/api/products/search', (req, res) => {
  const { query } = req.query;
  if (!query) return res.status(400).json({ error: 'Search query is required' });

  const results = products.filter(p =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase())
  );

  res.json(results);
});

// ==============================
// 🛑 GLOBAL ERROR HANDLER
// ==============================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// ==============================
// ✅ SERVER START
// ==============================
app.listen(PORT, () => {
  console.log(`Konzolo, the server is live at http://localhost:${PORT}`);
});

// Export app (optional for testing)
module.exports = app;
