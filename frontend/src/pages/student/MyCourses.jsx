import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBook, FiAward, FiArrowRight, FiSearch } from 'react-icons/fi';
import apiClient from '../../services/api.js';

const MyCourses = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    apiClient.get('/my-courses').then(res => {
      setEnrollments(res.data.enrollments || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = enrollments.filter(e =>
    e.course?.title?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-secondary dark:text-white">My Courses</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{enrollments.length} courses enrolled</p>
        </div>
        <div className="relative w-full sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search my courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="card p-5 animate-pulse dark:bg-slate-800 flex gap-4">
              <div className="w-16 h-16 bg-gray-200 dark:bg-slate-700 rounded-xl flex-shrink-0"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full w-full mt-3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center dark:bg-slate-800 dark:border-slate-700">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
            {search ? 'No courses match your search' : 'No enrolled courses yet'}
          </h3>
          {!search && (
            <Link to="/courses" className="btn-primary inline-block mt-2">Browse Courses</Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((enrollment) => (
            <div key={enrollment._id} className="card p-5 dark:bg-slate-800 dark:border-slate-700 flex flex-col sm:flex-row gap-4">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <FiBook className="text-primary text-2xl" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-bold text-secondary dark:text-white">{enrollment.course?.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{enrollment.course?.category}</p>
                  </div>
                  {enrollment.isCompleted ? (
                    <span className="badge bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 self-start">
                      <FiAward className="mr-1" /> Completed
                    </span>
                  ) : (
                    <span className="badge bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 self-start">
                      In Progress
                    </span>
                  )}
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{enrollment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${enrollment.isCompleted ? 'bg-green-500' : 'bg-primary'}`}
                      style={{ width: `${enrollment.progress}%` }}
                    ></div>
                  </div>
                </div>
                <Link
                  to={`/courses/${enrollment.course?._id}`}
                  className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
                >
                  {enrollment.isCompleted ? 'Review Course' : 'Continue Learning'} <FiArrowRight />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
