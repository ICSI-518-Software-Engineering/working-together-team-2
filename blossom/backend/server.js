const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS middleware

const app = express();
const port = process.env.PORT || 8086;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blossom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
const ordersRoutes = require('./routes/orders');
app.use('/api/orders', ordersRoutes); // Corrected route definition
//create order
const createOrderRoutes = require('./routes/createOrder');
app.use('/api/createOrder', createOrderRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
