import React, { useEffect, useState } from 'react';
import { FiSearch, FiTrash2, FiBook, FiUsers } from 'react-icons/fi';
import apiClient from '../../services/api.js';
import { toast } from 'react-toastify';

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    apiClient.get('/courses')
      .then(res => setCourses(res.data.courses || []))
      .catch(() => toast.error('Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this course and all its data?')) return;
    setDeleting(id);
    try {
      await apiClient.delete(`/courses/${id}`);
      setCourses(prev => prev.filter(c => c._id !== id));
      toast.success('Course deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    } finally {
      setDeleting(null);
    }
  };

  const filtered = courses.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">Manage All Courses</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{courses.length} total courses on platform</p>
      </div>

      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="input-field pl-10 max-w-sm dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        />
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3,4].map(i => (
            <div key={i} className="card h-16 animate-pulse dark:bg-slate-800"></div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center dark:bg-slate-800 dark:border-slate-700">
          <FiBook className="text-5xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No courses found</p>
        </div>
      ) : (
        <div className="card overflow-hidden dark:bg-slate-800 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Course</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Instructor</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Students</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {filtered.map(course => (
                  <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <FiBook className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary dark:text-white text-sm">{course.title}</p>
                          <span className="badge bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-xs">{course.category}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-sm text-gray-600 dark:text-gray-300">{course.instructor?.name || 'N/A'}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                        <FiUsers className="text-gray-400" /> {course.totalStudents || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-semibold text-secondary dark:text-white text-sm">
                        {course.price === 0 ? 'Free' : `$${course.price}`}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button
                          onClick={() => handleDelete(course._id)}
                          disabled={deleting === course._id}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-50"
                          title="Delete course"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
