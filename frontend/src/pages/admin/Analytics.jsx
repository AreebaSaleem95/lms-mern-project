import React, { useEffect, useState } from 'react';
import { FiUsers, FiBook, FiTrendingUp, FiAward } from 'react-icons/fi';
import apiClient from '../../services/api.js';
import { toast } from 'react-toastify';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/users/analytics').then(res => setData(res.data))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  }, []);

  const stats = data ? [
    { label: 'Total Users', value: data.userCount, icon: FiUsers, color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400', change: '+12%' },
    { label: 'Total Courses', value: data.courseCount, icon: FiBook, color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400', change: '+8%' },
    { label: 'Total Enrollments', value: data.enrollmentCount, icon: FiTrendingUp, color: 'bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400', change: '+24%' },
    { label: 'Completion Rate', value: '68%', icon: FiAward, color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400', change: '+5%' },
  ] : [];

  const roleBreakdown = data?.roleBreakdown || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">Analytics Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Platform overview and key metrics</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <div key={i} className="card h-28 animate-pulse dark:bg-slate-800"></div>)}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, color, change }) => (
              <div key={label} className="card p-5 dark:bg-slate-800 dark:border-slate-700">
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
                    <Icon className="text-lg" />
                  </div>
                  <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-400 px-2 py-0.5 rounded-full">{change}</span>
                </div>
                <p className="text-2xl font-bold text-secondary dark:text-white">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-6 dark:bg-slate-800 dark:border-slate-700">
              <h2 className="text-lg font-bold text-secondary dark:text-white mb-5">User Role Distribution</h2>
              <div className="space-y-4">
                {roleBreakdown.map(({ _id: role, count }) => {
                  const total = data.userCount || 1;
                  const pct = Math.round((count / total) * 100);
                  const colors = { admin: 'bg-red-500', instructor: 'bg-purple-500', student: 'bg-blue-500' };
                  return (
                    <div key={role}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-secondary dark:text-white capitalize">{role}</span>
                        <span className="text-gray-500 dark:text-gray-400">{count} ({pct}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${colors[role] || 'bg-gray-400'}`} style={{ width: `${pct}%` }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card p-6 dark:bg-slate-800 dark:border-slate-700">
              <h2 className="text-lg font-bold text-secondary dark:text-white mb-5">Quick Summary</h2>
              <div className="space-y-3">
                {[
                  { label: 'Avg. courses per instructor', value: data.courseCount && roleBreakdown.find(r => r._id === 'instructor')?.count ? Math.round(data.courseCount / roleBreakdown.find(r => r._id === 'instructor').count) : 0 },
                  { label: 'Avg. enrollments per course', value: data.courseCount ? Math.round(data.enrollmentCount / data.courseCount) : 0 },
                  { label: 'Student to instructor ratio', value: (() => { const s = roleBreakdown.find(r => r._id === 'student')?.count || 0; const i = roleBreakdown.find(r => r._id === 'instructor')?.count || 1; return `${Math.round(s/i)}:1`; })() },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-slate-700 last:border-0">
                    <span className="text-sm text-gray-600 dark:text-gray-300">{label}</span>
                    <span className="font-bold text-secondary dark:text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
