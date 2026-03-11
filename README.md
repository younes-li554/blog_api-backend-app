# Blog API Backend

## Overview
A secure and production-ready RESTful API for a Blog application built with Node.js, Express, Sequelize (PostgreSQL), JWT authentication, and Docker support.

This API includes:

- User registration and login with secure password hashing
- Role-based access control (user/admin)
- JWT Access & Refresh tokens
- CRUD operations for notes
- Input validation using `express-validator`
- Global error handling and logging with `winston` + `morgan`
- Dockerized setup with PostgreSQL
- Ready for production deployment

---

## Features

### Authentication
- Secure password hashing using `bcrypt`
- JWT access tokens (short-lived) & refresh tokens (long-lived)
- Role-based authorization (user/admin)
- Logout and token refresh endpoints

### Notes Management
- Create, read, update, delete notes
- Pagination for note listing
- Users can only modify their own notes unless admin

### Validation & Security
- Input validation with `express-validator`
- Rate limiting support (optional)
- CORS configuration
- Helmet for security headers

### Logging
- Request logging with `morgan`
- Error and info logging with `winston`
- Logs stored in `logs/combined.log` and `logs/error.log`

### Docker
- Dockerfile to containerize Node.js app
- Docker Compose to run Node.js + PostgreSQL together
- Easy setup for development and production

---

## Environment Variables

Create a `.env` file with the following variables:

```env
PORT=5000
DB_HOST=localhost
DB_NAME=blog_api
DB_USER=postgres
DB_PASSWORD=123456
JWT_SECRET=my_super_secret_key
JWT_EXPIRES=1h
NODE_ENV=development

Getting Started (Development)

Install dependencies:

npm install

Run the app locally:

node server.js

Run tests:

npm test
Using Docker

Build and run containers:

docker-compose up --build

API will be available at:

http://localhost:5000/api
API Endpoints
Users

POST /api/users/register → register new user

POST /api/users/login → login and get access & refresh tokens

POST /api/users/refresh-token → get new access token using refresh token

POST /api/users/logout → logout and invalidate refresh token

Notes

POST /api/notes → create a note (user/admin)

GET /api/notes → list notes with pagination

GET /api/notes/:id → get note by ID

PUT /api/notes/:id → update note (user/admin)

DELETE /api/notes/:id → delete note (user/admin)

Contributing

Feel free to contribute by forking the repository and adding features such as:

Better logging

Refresh token blacklist

Role management enhancements

Input validation improvements
