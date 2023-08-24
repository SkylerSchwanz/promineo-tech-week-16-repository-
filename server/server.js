// npm run devStart
require('dotenv').config();

const Joi = require('joi');
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3001;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3000';
const SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS || 10;
const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

app.use(express.json());
app.use(cors({ credentials: true, origin: CORS_ORIGIN }));; // Replace with your frontend domain

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(3).required(),
});

const productSchema = Joi.object({
  id: Joi.number().integer().required(),
  title: Joi.string().required(),
  price: Joi.number().positive().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string().uri().required(),
  quantity: Joi.number().integer().positive().min(1).required(),
  rating: Joi.object({
    rate: Joi.number().positive().required(),
    count: Joi.number().integer().positive().required(),
  }).required(),
});

const orderSchema = Joi.array().items(productSchema).min(1);

class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

app.use((err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).send(err.message);
  } else {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  }
});

const users = [];
const orders = [];

// GET endpoint for fetching all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST endpoint for registering
app.post(`/users/register`, async (req, res) => {

  try {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = { username: req.body.username, password: hashedPassword, cart: [], location: {} };
    users.push(user);
    res.status(201).send('Registration successful.');
  } catch (error) {
    res.status(500).send('Error registering. Please try again.');
  }

});

// POST endpoint for logging in
app.post(`/users/login`, async (req, res) => {
  try {
    // Find the user with the matching username
    const user = users.find((user) => user.username === req.body.username);
    if (!user) {
      return res.status(400).send('Incorrect username or password.');
    }

    // Compare the provided password with the stored password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Incorrect username or password.');
    }

    // Generate an access token for the user
    const accessToken = jwt.sign({ username: user.username }, JWT_SECRET);
    res.json({ username: user.username, accessToken });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send('An error occurred during login. Please try again later.');
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return next(new Error('No token provided'));

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) return next(new Error('Invalid token'));
    req.user = decodedToken; // Use the decoded token payload
    next();
  });
};


// DELETE endpoint for removing an item from the cart
app.delete(`/users/cart/:productId`, authenticateToken, async (req, res) => {
  try {
    const productId = Number(req.params.productId); // Convert to number
    const username = req.user.username; // Use req.user.username

    // Find the user with the matching username
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the index of the first item in the user's cart with a matching productId
    const index = user.cart.findIndex((product) => product.id === productId);

    // If an item with a matching productId was found, remove it from the cart
    if (index !== -1) {
      user.cart.splice(index, 1);
    }

    res.json({ message: `Item removed from cart, ${user.username}` });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).send('An error occurred while removing the item from the cart. Please try again later.');
  }
});

// PUT endpoint for updating the quantity of an item in the cart
app.put(`/users/cart/:productId`, authenticateToken, async (req, res) => {
  try {
    const productId = Number(req.params.productId); // Convert to number
    const { quantity } = req.body; // Get the quantity from the request body
    const username = req.user.username; // Use req.user.username

    // Find the user with the matching username
    const user = users.find((user) => user.username === username);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the item with the matching productId in the user's cart
    const item = user.cart.find((product) => product.id === productId);

    // If an item with a matching productId was found, update its quantity
    if (item) {
      item.quantity = parseInt(quantity);
    }

    res.json({ item });
  } catch (error) {
    console.error('Error updating item quantity:', error);
    res.status(500).send('An error occurred while updating the item quantity. Please try again later.');
  }
});

// POST endpoint for placing an order
app.post('/users/place-order', authenticateToken, async (req, res, next) => {
  try {
    // Find the user with the matching username
    const user = users.find((user) => user.username === req.user.username);
    if (!user) {
      throw new CustomError('User not found.', 404);
    }

    // 'cart' is an array inside the user object
    const userCart = user.cart;

    // Validate the request body
    const { error } = orderSchema.validate(userCart);
    if (error) {
      throw new CustomError(error.details[0].message, 400);
    }

    // Create a new order object containing cart items and the current time
    const order = {
      userId: user.id, // Assuming each user has a unique id
      items: userCart,
      timestamp: new Date().toISOString(),
    };

    // Add the order to the 'orders' array
    orders.push(order);

    // Clear the user's cart after placing the order
    user.cart = [];

    res.status(201).send('Order placed successfully.');
  } catch (error) {
    next(error);
  }
});


// GET endpoint to retrieve a user's orders
app.get('/users/orders', authenticateToken, (req, res, next) => {
  try {
    const user = users.find((user) => user.username === req.user.username);
    if (!user) {
      throw new CustomError('User not found.', 404);
    }

    // Retrieve orders associated with the user's id from the 'orders' array
    const userOrders = orders.filter((order) => order.userId === user.id);

    res.json({ orders: userOrders });
  } catch (error) {
    next(error);
  }
});

// Endpoint to get the user's cart based on their token
app.get('/users/cart', authenticateToken, (req, res, next) => {
  try {
    const user = users.find((user) => user.username === req.user.username);
    if (!user) {
      throw new CustomError('User not found.', 404);
    }

    // Assuming 'cart' is an array inside the user object
    const userCart = user.cart;
    res.json({ cart: userCart });
  } catch (error) {
    next(error);
  }
});

// POST endpoint for adding product to user's account
app.post(`/users/:username/cart`, authenticateToken, async (req, res) => {
  //const { userId } = req.params; // User's id from the URL parameter
  const productId = req.body.productId; // Product ID to add to the cart

  const user = users.find((user) => user.username === req.user.username);
  if (!user) {
    return res.status(404).send('User not found.');
  }

  // Check if the product is already in the cart
  const existingCartItem = user.cart.find((item) => item.id === productId);

  if (existingCartItem) {
    // Update the quantity of the existing cart item
    existingCartItem.quantity += 1;
    res.json(existingCartItem);
  } else {
    // Fetch the product details from the FakeStore API using the provided product ID
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      if (!response.ok) {
        return res.status(404).send('Product not found.');
      }

      const productToAdd = await response.json();

      // Add a quantity property to the product with an initial value of 1
      productToAdd.quantity = 1;

      // Assuming 'cart' is an array inside the user object
      user.cart.push(productToAdd);

      res.status(200).send(productToAdd);
    } catch (error) {
      console.error(error);
      res.status(500).send(`Error adding product to cart: ${error.message}`);
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});