import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiAward, FiTrendingUp, FiClock, FiArrowRight } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext.jsx';
import apiClient from '../../services/api.js';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/my-courses').then(res => {
      setEnrollments(res.data.enrollments || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const completed = enrollments.filter(e => e.isCompleted).length;
  const inProgress = enrollments.filter(e => !e.isCompleted && e.progress > 0).length;
  const avgProgress = enrollments.length
    ? Math.round(enrollments.reduce((sum, e) => sum + e.progress, 0) / enrollments.length)
    : 0;

  const stats = [
    { label: 'Enrolled Courses', value: enrollments.length, icon: FiBook, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
    { label: 'Completed', value: completed, icon: FiAward, color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
    { label: 'In Progress', value: inProgress, icon: FiTrendingUp, color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' },
    { label: 'Avg. Progress', value: `${avgProgress}%`, icon: FiClock, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Track your learning progress and continue where you left off.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card p-5 dark:bg-slate-800 dark:border-slate-700">
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl mb-3 ${color}`}>
              <Icon className="text-lg" />
            </div>
            <p className="text-2xl font-bold text-secondary dark:text-white">{value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {/* Recent Courses */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-bold text-secondary dark:text-white">My Courses</h2>
        <Link to="/student/my-courses" className="text-sm text-primary hover:underline flex items-center gap-1">
          View all <FiArrowRight />
        </Link>
      </div>

      {loading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="card p-5 animate-pulse dark:bg-slate-800">
              <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
              <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2"></div>
              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full w-full mt-4"></div>
            </div>
          ))}
        </div>
      ) : enrollments.length === 0 ? (
        <div className="card p-10 text-center dark:bg-slate-800 dark:border-slate-700">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No courses yet</h3>
          <p className="text-gray-400 mb-4">Start learning by enrolling in a course</p>
          <Link to="/courses" className="btn-primary inline-block">Browse Courses</Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {enrollments.slice(0, 6).map((enrollment) => (
            <div key={enrollment._id} className="card p-5 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <FiBook className="text-primary" />
                </div>
                {enrollment.isCompleted && (
                  <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    <FiAward className="mr-1" /> Completed
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-secondary dark:text-white text-sm mb-1 line-clamp-2">
                {enrollment.course?.title}
              </h3>
              <p className="text-xs text-gray-400 mb-3">{enrollment.course?.category}</p>
              <div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{enrollment.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${enrollment.progress}%` }}
                  ></div>
                </div>
              </div>
              <Link
                to={`/courses/${enrollment.course?._id}`}
                className="mt-4 text-xs text-primary font-medium hover:underline flex items-center gap-1"
              >
                Continue Learning <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
