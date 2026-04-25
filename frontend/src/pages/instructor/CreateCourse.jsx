import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiDollarSign, FiTag, FiFileText, FiImage } from 'react-icons/fi';
import apiClient from '../../services/api.js';
import { toast } from 'react-toastify';

const categories = ['Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Photography', 'Other'];
const levels = ['Beginner', 'Intermediate', 'Advanced'];

const CreateCourse = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '', description: '', category: '', price: '', level: 'Beginner',
    language: 'English', thumbnail: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiClient.post('/courses', { ...form, price: Number(form.price) });
      toast.success('Course created successfully!');
      navigate(`/instructor/upload-lessons/${res.data.course._id}`);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">Create New Course</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Fill in the details to publish your course</p>
      </div>

      <div className="card p-8 dark:bg-slate-800 dark:border-slate-700">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Course Title *</label>
            <div className="relative">
              <FiBook className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="title" type="text" value={form.title} onChange={handleChange} placeholder="e.g., Complete React Developer Course" required className="input-field pl-10 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Description *</label>
            <div className="relative">
              <FiFileText className="absolute left-3 top-3 text-gray-400" />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe what students will learn..." required rows={4} className="input-field pl-10 resize-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
              <div className="relative">
                <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select name="category" value={form.category} onChange={handleChange} required className="input-field pl-10 dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Price (USD) *</label>
              <div className="relative">
                <FiDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="0 for free" required className="input-field pl-10 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Level</label>
              <select name="level" value={form.level} onChange={handleChange} className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white">
                {levels.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Language</label>
              <input name="language" type="text" value={form.language} onChange={handleChange} placeholder="English" className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Thumbnail URL</label>
            <div className="relative">
              <FiImage className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input name="thumbnail" type="url" value={form.thumbnail} onChange={handleChange} placeholder="https://example.com/image.jpg" className="input-field pl-10 dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading} className="btn-primary flex-1 py-3">
              {loading ? 'Creating...' : 'Create Course & Add Lessons'}
            </button>
            <button type="button" onClick={() => navigate('/instructor/manage-courses')} className="btn-outline px-6">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
