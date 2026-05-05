# 📚 Learning Management System (MERN Stack)

A full-stack Learning Management System (LMS) built using the MERN stack.  
The platform allows students to enroll in courses, instructors to manage content, and admins to control the system with secure authentication and role-based access.

---

## 🚀 Live Demo

**Frontend:**  
https://lms-mern-project-1-t9ya.onrender.com  

**Backend API:**  
https://lms-mern-project-fhmv.onrender.com  

**GitHub Repository:**  
https://github.com/AreebaSaleem95/lms-mern-project  
**## 🎥 Demo Video

👉https://drive.google.com/file/d/1X5-urLZGFvqh4I48iSAzcDY2X2KwfpfL/view

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
- Render (Frontend & Backend)  

---

## ✨ Features

### 👨‍🎓 Student
- Register and login  
- Browse available courses  
- Enroll in courses  

### 👨‍🏫 Instructor
- Create and manage courses  
- View enrolled students  

### 🛡️ Admin
- Manage users  
- Control platform data  

---

## 🔐 Authentication & Authorization

- Secure authentication using JWT  
- Password hashing using bcrypt  
- Role-based access control (Admin, Instructor, Student)  
- Protected API routes using middleware  

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
_____________________________________________________________________________________________________

---

## ⚙️ Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/AreebaSaleem95/lms-mern-project.git
cd lms-mern-project
2. Backend Setup
cd backend
npm install

Create a .env file and add:

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
Authentication
POST /api/auth/register
POST /api/auth/login
Courses
GET /api/courses
POST /api/courses
DELETE /api/courses/:id
Health Check
GET /api/health
📸 Screenshots

Add screenshots here after uploading them

/screenshots/home.png
/screenshots/login.png
/screenshots/dashboard.png
/screenshots/courses.png
⚡ Repository Optimization & Code Quality
🧱 Architecture
Modular backend structure (MVC pattern)
Clean and reusable React components
Proper separation of concerns
🔐 Security
JWT-based authentication
Password hashing using bcrypt
Protected routes with middleware
⚙️ Performance
Asynchronous API handling using async/await
Optimized MongoDB queries
Efficient React rendering
🌐 Deployment
Fully deployed on Render
Environment variables configured for production
Scalable full-stack architecture
🧪 Testing
API tested using Postman
Centralized error handling middleware
🧠 What I Learned
Full-stack MERN development
RESTful API design
Authentication and authorization systems
Deployment and environment configuration
Debugging and error handling
🚀 Future Improvements
Payment integration
Video lecture system
Real-time chat functionality
Enhanced UI/UX design
Performance optimizations
👩‍💻 Author

Areeba Saleem
BS Computer Science
Full Stack Developer

GitHub: https://github.com/AreebaSaleem95

⭐ Acknowledgment

Thanks to my instructors and learning programs for their guidance and support.
