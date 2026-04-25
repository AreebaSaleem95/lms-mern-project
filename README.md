# Full Fledged MERN Stack Learning Management System

A full-stack Learning Management System (LMS) built with the MERN stack, following clean code principles, MVC architecture, and role-based access control for **Admin**, **Instructor**, and **Student** users.

## Overview

This LMS provides:

- Secure authentication with JWT and bcrypt-hashed passwords.
- Role-based dashboards for admins, instructors, and students.
- Course management with lessons, categories, and pricing.
- Student enrollments with progress tracking.
- A modern React frontend using React Router, Axios, and React Bootstrap.

## Technologies Used

- **Frontend**: React, React Router, Axios, Bootstrap, React Bootstrap, Vite.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose.
- **Auth & Security**: JWT, bcryptjs, dotenv, role-based middleware, CORS.

## Project Structure (High-Level)

- `backend/` – Express API (MVC: models, controllers, routes, middleware, config).
- `frontend/` – React SPA (components, pages, routes, context, services).

## Installation

### Prerequisites

- Node.js (LTS) and npm installed.
- MongoDB running locally or accessible via connection string.

### Backend Setup

```bash
cd "Learning Management system/backend"
npm install
cp ../.env.example .env   # On Windows, create .env manually if needed
```

Edit `backend/.env` with your values:

- `PORT=5000`
- `MONGO_URI=mongodb://localhost:27017/lms_db`
- `JWT_SECRET=your_long_random_secret`
- `JWT_EXPIRES_IN=7d`

Start the backend in development:

```bash
npm run dev
```

The API will run at `http://localhost:5000/api`.

### Frontend Setup

```bash
cd "Learning Management system/frontend"
npm install
```

Optionally create `frontend/.env` and set:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend dev server:

```bash
npm run dev
```

The app will run at the Vite URL (default `http://localhost:5173`).

## How to Run the Project

1. **Start MongoDB** (locally or ensure your remote cluster is reachable).
2. **Start backend**: `cd backend && npm run dev`.
3. **Start frontend**: `cd frontend && npm run dev`.
4. Open the frontend URL in the browser and register/login.

## API Endpoints

Base URL: `http://localhost:5000/api`

### Authentication

- **POST** `/auth/register` – Register a new user (body: `name`, `email`, `password`, `role?`).
- **POST** `/auth/login` – Login and receive JWT (body: `email`, `password`).

### Courses

- **GET** `/courses` – Public list of all courses.
- **POST** `/courses` – Create course (roles: `instructor`, `admin`, requires JWT).
- **PUT** `/courses/:id` – Update course (owner instructor or `admin`, requires JWT).
- **DELETE** `/courses/:id` – Delete course (owner instructor or `admin`, requires JWT).

### Users (Admin Only)

- **GET** `/users` – List all users (requires JWT, role `admin`).
- **DELETE** `/users/:id` – Delete a user (requires JWT, role `admin`).

### Enrollment

- **POST** `/enroll` – Enroll authenticated student in course (body: `courseId`, requires JWT).
- **GET** `/my-courses` – Get authenticated student’s enrollments and course info (requires JWT).

## Notes

- JWT tokens are expected in the `Authorization` header as `Bearer <token>`.
- Frontend Axios instance automatically attaches the stored JWT (from `localStorage`) to requests.
- All critical backend modules and frontend components are fully commented for learning and maintainability.

