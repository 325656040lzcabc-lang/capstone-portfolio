# Full-Stack Portfolio & Blog Application (Capstone Project)

**Course:** Web Data Management and Application  
**Total Marks:** 100

## Live URLs (部署后请替换)
- **Front-End:** https://your-frontend.vercel.app
- **Back-End:** https://your-backend.onrender.com

## Project Structure

```
CapstoneProject/
├── backend/                 # Node.js + Express + MongoDB API
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── utils/
│   ├── server.js
│   └── package.json
├── frontend/                # React SPA
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
└── README.md
```

## Features Implemented

### Back-End
- MVC structure
- 5 Mongoose Models: User, Project, BlogPost, Comment, Message
- Password hashing with bcryptjs
- JWT authentication
- protect middleware
- All required CRUD endpoints
- Author-only authorization for Blog posts
- Central error handling
- helmet + dotenv + cors

### Front-End
- React + React Router
- Auth Context (global state)
- Protected /admin route
- Auth-aware Header
- Public pages: Home, Projects, Blog, Blog Detail, Contact
- Login / Register
- Admin Dashboard (Create / Update / Delete Projects & Blog Posts)
- Commenting on blog posts

## API Endpoints

| Method | Endpoint                        | Access     | Description                |
|--------|---------------------------------|------------|----------------------------|
| POST   | /api/users/register             | Public     | Register user              |
| POST   | /api/users/login                | Public     | Login & get JWT            |
| GET    | /api/users/profile              | Private    | Get current user           |
| GET    | /api/projects                   | Public     | List all projects          |
| GET    | /api/projects/:id               | Public     | Get single project         |
| POST   | /api/projects                   | Private    | Create project             |
| PUT    | /api/projects/:id               | Private    | Update project             |
| DELETE | /api/projects/:id               | Private    | Delete project             |
| GET    | /api/blog                       | Public     | List all posts             |
| GET    | /api/blog/:id                   | Public     | Get post + comments        |
| POST   | /api/blog                       | Private    | Create post                |
| PUT    | /api/blog/:id                   | Private+Author | Update post           |
| DELETE | /api/blog/:id                   | Private+Author | Delete post           |
| GET    | /api/blog/:postId/comments      | Public     | Get comments               |
| POST   | /api/blog/:postId/comments      | Private    | Create comment             |
| POST   | /api/contact                    | Public     | Send contact message       |
| GET    | /api/contact                    | Private    | Get all messages           |

## How to Run Locally

### 1. Backend
```bash
cd backend
npm install
# Edit .env with your MongoDB Atlas URI and JWT_SECRET
npm start
# Server runs on http://localhost:5000
```

### 2. Frontend
```bash
cd frontend
npm install
# Optional: create .env with REACT_APP_API_URL=http://localhost:5000/api
npm start
# App runs on http://localhost:3000
```

## Deployment Notes

### Backend (Render recommended)
1. Push backend folder to GitHub
2. Create new Web Service on Render
3. Set environment variables: MONGO_URI, JWT_SECRET, NODE_ENV=production
4. Start command: `node server.js`

### Frontend (Vercel recommended)
1. Push frontend folder to GitHub
2. Import to Vercel
3. Set environment variable: REACT_APP_API_URL=https://your-backend-url/api
4. Deploy

## Student Info
- Student ID: (填写你的学号)
- Student Name: (填写你的姓名)

