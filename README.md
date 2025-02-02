<h3>Blog App Backend<h3>

  

This is the backend for a blog application built using Node.js and Express.js. It includes user authentication (login, register, logout) with JWT and bcrypt for password hashing. The app also provides full CRUD operations for blog posts using MongoDB as the database.

🚀 Features

🔐 User Authentication (Register, Login, Logout)

🔑 Secure password storage using bcrypt

🛡️ Token-based authentication with JWT

✍️ Create, Read, Update, and Delete (CRUD) operations for blog posts

🔒 Protected routes to ensure only authenticated users can modify blogs

📦 MongoDB as the database

🛠 Technologies Used

Node.js

Express.js

MongoDB with Mongoose

JWT (JSON Web Token)

bcrypt for password hashing

dotenv for environment variables

📥 Installation

Prerequisites

Node.js installed

MongoDB installed and running

Steps

Clone the repository:

git clone https://github.com/yourusername/blog-app-backend.git
cd blog-app-backend

Install dependencies:

npm install

Create a .env file in the root directory and add the following environment variables:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Start the server:

npm start


npm run dev

📜 License

This project is licensed under the MIT License.

