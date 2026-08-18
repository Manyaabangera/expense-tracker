# Expense Tracker

A full-stack web application for managing and analyzing personal expenses.

## Features

- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes
- Add expenses
- View expenses
- Edit expenses
- Delete expenses
- Filter expenses by category
- Filter expenses by date
- Total spending summary
- Total expense count
- Category-wise expense summary
- Responsive user interface

## Tech Stack

### Frontend

- React
- Vite
- JavaScript
- React Router
- HTML
- CSS

### Backend

- Node.js
- Express.js
- REST API
- JWT
- bcrypt

### Database

- MongoDB
- Mongoose

## Project Structure

```text
expense-tracker/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md
