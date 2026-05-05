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
**2. Backend Setup**
cd backend
npm install
**Create a .env file and add:**
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
**Run backend:**
