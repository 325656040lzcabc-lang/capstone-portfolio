# Full-Stack Portfolio & Blog Application (Capstone Project)

**Course:** Web Data Management and Application  
**Total Marks:** 100  
**Student ID:** 24998100  
**Student Name:** 刘梓晨

## Live URLs

- **Front-End:** https://capstone-portfolio-psi.vercel.app
- **Back-End:** https://capstone-backend-tigb.onrender.com
- **GitHub Repository:** https://github.com/325656040lzcabc-lang/capstone-portfolio

## Project Overview

This is a complete full-stack personal portfolio and blog application built as the Capstone Project for the Web Data Management and Application course.

- **Back-End:** Node.js + Express + MongoDB Atlas + JWT Authentication
- **Front-End:** React (Create React App) + React Router + Context API

## Project Structure

- backend/
  - models/
  - controllers/
  - routes/
  - middleware/
  - server.js
  - package.json
- frontend/
  - src/
    - components/
    - pages/
    - context/
    - services/
  - package.json
- README.md

## Features

### Back-End
- MVC architecture
- Mongoose Models: User, Project, BlogPost, Comment, Message
- Password hashing with bcryptjs
- JWT authentication & authorization
- Protected routes with middleware
- Author-only permission for blog post update/delete
- Centralized error handling
- Security: helmet, cors, dotenv

### Front-End
- Responsive design
- React Router (multi-page SPA)
- Global Auth state with Context API
- Protected /admin route
- Auth-aware Header (Login/Register ↔ Logout + Admin)
- Full CRUD for Projects and Blog Posts in Admin Dashboard
- Blog commenting system
- Contact form

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | /api/users/register | Public | Register a new user |
| POST | /api/users/login | Public | Login and receive JWT |
| GET | /api/projects | Public | Get all projects |
| GET | /api/projects/:id | Public | Get a single project |
| POST | /api/projects | Private | Create a project |
| PUT | /api/projects/:id | Private | Update a project |
| DELETE | /api/projects/:id | Private | Delete a project |
| GET | /api/blog | Public | Get all blog posts |
| GET | /api/blog/:id | Public | Get a single post with comments |
| POST | /api/blog | Private | Create a blog post |
| PUT | /api/blog/:id | Private + Author | Update own blog post |
| DELETE | /api/blog/:id | Private + Author | Delete own blog post |
| GET | /api/blog/:postId/comments | Public | Get comments for a post |
| POST | /api/blog/:postId/comments | Private | Add a comment |
| POST | /api/contact | Public | Submit contact form message |

## How to Run Locally

### Prerequisites
- Node.js
- MongoDB Atlas account

### 1. Backend
```bash
cd backend
npm install
