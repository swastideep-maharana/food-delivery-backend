# 🍕 Food Delivery Website - Backend API

A robust, scalable backend API for the food delivery application built with Node.js, Express.js, and MongoDB. Features secure authentication, payment processing, and real-time order management.

![Node.js](https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.18+-black?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-green?style=for-the-badge&logo=mongodb)

## ✨ Features

### 🔐 Authentication & Security

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt encryption for user passwords
- **Input Validation** - Comprehensive request validation
- **CORS Support** - Cross-origin resource sharing enabled
- **Rate Limiting** - Protection against abuse

### 🍽️ Food Management

- **CRUD Operations** - Create, read, update, delete food items
- **Image Upload** - Multer middleware for file handling
- **Category Filtering** - Organize food by categories
- **Search Functionality** - Find food items quickly
- **Pagination** - Efficient data loading

### 🛒 Shopping Cart

- **Cart Management** - Add, remove, and update cart items
- **User-Specific Carts** - Individual cart for each user
- **Real-time Updates** - Instant cart synchronization
- **Persistent Storage** - Cart data saved to database

### 💳 Payment Processing

- **Stripe Integration** - Secure payment gateway
- **Order Verification** - Payment confirmation system
- **Transaction History** - Complete payment records
- **Refund Support** - Handle payment reversals

### 📦 Order Management

- **Order Creation** - Complete order processing
- **Status Tracking** - Real-time order status updates
- **Order History** - User order management
- **Admin Controls** - Order management for administrators

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd "Food Delivery Website/backend"
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:

   ```env
   PORT=4000
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your-super-secret-jwt-key
   STRIPE_SECRET_KEY=your-stripe-secret-key
   ```

4. **Start the server**

   ```bash
   npm start
   ```

5. **Access the API**
   The server will run on `http://localhost:4000`

### Development Mode

```bash
npm run dev
```

## 🛠️ Tech Stack

### Backend Framework

- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling

### Authentication & Security

- **JWT** - JSON Web Tokens for authentication
- **Bcrypt** - Password hashing
- **Validator** - Input validation
- **CORS** - Cross-origin resource sharing

### File Handling

- **Multer** - File upload middleware
- **File System** - Local file storage

### Payment Processing

- **Stripe** - Payment gateway integration

### Development Tools

- **Nodemon** - Development server with auto-restart
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
backend/
├── config/                 # Configuration files
│   └── db.js              # Database connection
├── controllers/            # Route controllers
│   ├── foodController.js   # Food item management
│   ├── userController.js   # User authentication
│   ├── cartController.js   # Shopping cart logic
│   └── orderController.js  # Order processing
├── middleware/             # Custom middleware
│   └── auth.js            # Authentication middleware
├── models/                 # Database models
│   ├── foodModel.js       # Food item schema
│   ├── userModel.js       # User schema
│   └── orderModel.js      # Order schema
├── routes/                 # API routes
│   ├── foodRoute.js       # Food endpoints
│   ├── userRoute.js       # User endpoints
│   ├── cartRoute.js       # Cart endpoints
│   └── orderRoute.js      # Order endpoints
├── uploads/               # File upload directory
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
└── .env                   # Environment variables
```

## 🔌 API Endpoints

### Authentication

```
POST /api/user/register    # User registration
POST /api/user/login       # User login
```

### Food Items

```
GET    /api/food/list      # Get all food items
POST   /api/food/add       # Add new food item
POST   /api/food/remove    # Remove food item
GET    /images/:filename   # Serve food images
```

### Shopping Cart

```
POST /api/cart/add         # Add item to cart
POST /api/cart/remove      # Remove item from cart
POST /api/cart/get         # Get user's cart
```

### Orders

```
POST /api/order/place      # Place new order
POST /api/order/verify     # Verify payment
POST /api/order/userorders # Get user orders
GET  /api/order/list       # Get all orders (admin)
POST /api/order/status     # Update order status
```

## 🗄️ Database Schema

### User Model

```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  cartData: Object,
  createdAt: Date
}
```

### Food Model

```javascript
{
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Order Model

```javascript
{
  userId: String,
  items: Array,
  amount: Number,
  address: Object,
  status: String,
  payment: Boolean,
  createdAt: Date
}
```

## 🔧 Configuration

### Environment Variables

```env
PORT=4000                          # Server port
MONGODB_URI=mongodb://localhost:27017/food-delivery
JWT_SECRET=your-super-secret-jwt-key
STRIPE_SECRET_KEY=sk_test_...
NODE_ENV=development
```

### Database Connection

The application uses MongoDB with Mongoose ODM for:

- Flexible schema design
- Data validation
- Middleware support
- Query optimization

## 🚀 Performance Optimizations

- **Database Indexing** - Optimized queries with proper indexes
- **Pagination** - Efficient data loading for large datasets
- **Image Optimization** - Compressed image storage
- **Caching** - Response caching for frequently accessed data
- **Error Handling** - Comprehensive error management

## 🔒 Security Features

- **JWT Authentication** - Secure token-based sessions
- **Password Hashing** - Bcrypt encryption
- **Input Validation** - Request data sanitization
- **CORS Protection** - Cross-origin request handling
- **Rate Limiting** - API abuse prevention

## 🧪 Testing

```bash
# Run the server
npm start

# Development mode with auto-restart
npm run dev

# Check for linting issues
npm run lint
```

## 📊 API Response Format

### Success Response

```json
{
  "success": true,
  "data": {...},
  "message": "Operation successful"
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```
