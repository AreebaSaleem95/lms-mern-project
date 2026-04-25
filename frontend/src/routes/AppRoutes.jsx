import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

import Home from '../pages/Home.jsx';
import About from '../pages/About.jsx';
import Courses from '../pages/Courses.jsx';
import CourseDetail from '../pages/CourseDetail.jsx';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

import StudentDashboard from '../pages/student/StudentDashboard.jsx';
import MyCourses from '../pages/student/MyCourses.jsx';

import CreateCourse from '../pages/instructor/CreateCourse.jsx';
import InstructorManageCourses from '../pages/instructor/ManageCourses.jsx';
import UploadLessons from '../pages/instructor/UploadLessons.jsx';

import AdminManageUsers from '../pages/admin/ManageUsers.jsx';
import AdminManageCourses from '../pages/admin/ManageCourses.jsx';
import Analytics from '../pages/admin/Analytics.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/courses" element={<Courses />} />
    <Route path="/courses/:id" element={<CourseDetail />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    <Route path="/student/dashboard" element={
      <ProtectedRoute allowedRoles={['student']}>
        <StudentDashboard />
      </ProtectedRoute>
    } />
    <Route path="/student/my-courses" element={
      <ProtectedRoute allowedRoles={['student']}>
        <MyCourses />
      </ProtectedRoute>
    } />

    <Route path="/instructor/create-course" element={
      <ProtectedRoute allowedRoles={['instructor', 'admin']}>
        <CreateCourse />
      </ProtectedRoute>
    } />
    <Route path="/instructor/manage-courses" element={
      <ProtectedRoute allowedRoles={['instructor', 'admin']}>
        <InstructorManageCourses />
      </ProtectedRoute>
    } />
    <Route path="/instructor/upload-lessons/:id" element={
      <ProtectedRoute allowedRoles={['instructor', 'admin']}>
        <UploadLessons />
      </ProtectedRoute>
    } />

    <Route path="/admin/manage-users" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminManageUsers />
      </ProtectedRoute>
    } />
    <Route path="/admin/manage-courses" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminManageCourses />
      </ProtectedRoute>
    } />
    <Route path="/admin/analytics" element={
      <ProtectedRoute allowedRoles={['admin']}>
        <Analytics />
      </ProtectedRoute>
    } />

    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
