import React, { useEffect, useState } from 'react';
import { FiSearch, FiTrash2, FiUser, FiShield } from 'react-icons/fi';
import apiClient from '../../services/api.js';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/AuthContext.jsx';

const roleColors = {
  admin: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  instructor: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  student: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    apiClient.get('/users').then(res => setUsers(res.data.users || []))
      .catch(() => toast.error('Failed to load users'))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (id === currentUser?.id) { toast.warning("You can't delete yourself"); return; }
    if (!window.confirm('Delete this user?')) return;
    try {
      await apiClient.delete(`/users/${id}`);
      setUsers(prev => prev.filter(u => u._id !== id));
      toast.success('User deleted');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Delete failed');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      const res = await apiClient.put(`/users/${id}/role`, { role });
      setUsers(prev => prev.map(u => u._id === id ? res.data.user : u));
      toast.success('Role updated');
    } catch {
      toast.error('Failed to update role');
    }
  };

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === 'all' || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">Manage Users</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{users.length} total users</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-10 dark:bg-slate-800 dark:border-slate-600 dark:text-white" />
        </div>
        <select value={roleFilter} onChange={e => setRoleFilter(e.target.value)} className="input-field w-full sm:w-40 dark:bg-slate-800 dark:border-slate-600 dark:text-white">
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="instructor">Instructors</option>
          <option value="admin">Admins</option>
        </select>
      </div>

      {loading ? (
        <div className="space-y-3">{[1,2,3,4].map(i => <div key={i} className="card h-16 animate-pulse dark:bg-slate-800"></div>)}</div>
      ) : filtered.length === 0 ? (
        <div className="card p-12 text-center dark:bg-slate-800 dark:border-slate-700">
          <FiUser className="text-5xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No users found</p>
        </div>
      ) : (
        <div className="card overflow-hidden dark:bg-slate-800 dark:border-slate-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden sm:table-cell">Email</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">Joined</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
                {filtered.map(u => (
                  <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {u.name?.charAt(0).toUpperCase()}
                        </div>
                        <p className="font-medium text-secondary dark:text-white text-sm">{u.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <p className="text-sm text-gray-500 dark:text-gray-400">{u.email}</p>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={u.role}
                        onChange={e => handleRoleChange(u._id, e.target.value)}
                        disabled={u._id === currentUser?.id}
                        className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${roleColors[u.role]} disabled:opacity-50`}
                      >
                        <option value="student">student</option>
                        <option value="instructor">instructor</option>
                        <option value="admin">admin</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-xs text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end">
                        <button onClick={() => handleDelete(u._id)} disabled={u._id === currentUser?.id} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors disabled:opacity-30" title="Delete user">
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

export default ManageUsers;
