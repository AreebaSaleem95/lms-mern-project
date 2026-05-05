# 📚 Learning Management System (MERN Stack)

A full-stack Learning Management System (LMS) built using the MERN stack.  
This platform enables students to enroll in courses, instructors to manage content, and admins to control the system with secure authentication and role-based access.

---

## 🚀 Live Demo

**Frontend:**  
https://lms-mern-project-1-t9ya.onrender.com  

**Backend API:**  
https://lms-mern-project-fhmv.onrender.com  

**GitHub Repository:**  
https://github.com/AreebaSaleem95/lms-mern-project  

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Token (JWT)
- bcrypt

### Deployment
- Render (Frontend + Backend)

---

## ✨ Features

### 👨‍🎓 Student
- Register & Login  
- Browse courses  
- Enroll in courses  

### 👨‍🏫 Instructor
- Create courses  
- Manage course content  
- View enrolled students  

### 🛡️ Admin
- Manage users  
- Control platform data  

---

## 🔐 Authentication & Authorization

- Secure login system using JWT  
- Password hashing using bcrypt  
- Role-based access control  
- Protected routes using middleware  

---

## 📁 Project Structure
lms-mern-project/
│
├── frontend/
│ ├── src/
│ └── public/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── middleware/
│ └── config/
│
├── .env.example
└── README.md

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/AreebaSaleem95/lms-mern-project.git
cd lms-mern-project
2. Backend Setup
cd backend
npm install
Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start
3. Frontend Setup
cd frontend
npm install
npm run dev
📡 API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
Courses
GET /api/courses
POST /api/courses
DELETE /api/courses/:id
Health Check
GET /api/health
📸 Screenshots

Add your screenshots here

/screenshots/home.png
/screenshots/login.png
/screenshots/dashboard.png
/screenshots/courses.png
⚡ Repository Optimization & Code Quality
🧱 Architecture
Modular backend structure (MVC pattern)
Clean React component structure
Separation of concerns
🔐 Security
JWT authentication
bcrypt password hashing
Protected routes & middleware
⚙️ Performance
Async/await API handling
Optimized MongoDB queries
Efficient React rendering
🌐 Deployment
Hosted on Render
Environment variables configured
Scalable structure for production
🧪 Testing
API tested using Postman
Error handling middleware implemented
🧠 What I Learned
Full-stack MERN development
REST API design
Authentication & authorization
Deployment workflows
Debugging and error handling
🚀 Future Improvements
Payment integration
Video lectures
Real-time chat
Advanced UI/UX
Performance optimization
👩‍💻 Author

Areeba Saleem
BS Computer Science
Full Stack Developer

GitHub: https://github.com/AreebaSaleem95

⭐ Acknowledgment

Thanks to my instructors and learning programs for guidance and support.
