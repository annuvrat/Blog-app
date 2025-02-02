<h1 align="center">BLOG BACKEND</h1>

<p align="center">
  A robust backend for a blog application built with Node.js and Express.js, featuring user authentication, JWT implementation, and full CRUD operations.
</p>

## 📋 Overview

This is the backend for a blog application built using Node.js and Express.js. It includes user authentication (login, register, logout) with JWT and bcrypt for password hashing. The app also provides full CRUD operations for blog posts using MongoDB as the database.

## 🚀 Features

- **🔐 User Authentication**
  - Register, Login, and Logout functionality
  - Secure session management
  
- **🔑 Security Features**
  - Password hashing with bcrypt
  - Token-based authentication using JWT
  
- **✍️ Blog Management**
  - Complete CRUD operations for blog posts
  - Protected routes for authenticated users
  
- **🔒 Data Security**
  - MongoDB integration for secure data storage
  - Protected routes architecture
  - Input validation and sanitization

## 🛠 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB-Atlas** - Database system
- **Mongoose** - MongoDB object modeling
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management

## 📥 Installation

### Prerequisites

- Node.js installed on your system
- MongoDB installed and running
- Git for version control

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/annuvrat/Blog-app.git
   cd blog-app-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the root directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

4. **Start the server**
   
   For development:
   ```bash
   npm start
   ```

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ from Annuvrat
</p>
