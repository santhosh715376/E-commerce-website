# E-Commerce Website

A full-stack e-commerce application built with React and Node.js.

## Features

- User authentication (login/register)
- Product catalog with responsive design
- Shopping cart functionality
- Modern UI with translucent navbar
- JWT-based authentication

## Tech Stack

**Frontend:**
- React 19
- React Router
- CSS3 with responsive design

**Backend:**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication

## Setup

### Backend
```bash
cd backend
npm install
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `.env` file in backend directory:
```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
```