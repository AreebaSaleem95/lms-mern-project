import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlus, FiTrash2, FiPlay, FiArrowLeft } from 'react-icons/fi';
import apiClient from '../../services/api.js';
import { toast } from 'react-toastify';

const UploadLessons = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', content: '', videoUrl: '', duration: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    apiClient.get(`/courses/${id}`).then(res => setCourse(res.data.course))
      .catch(() => toast.error('Course not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleAddLesson = async (e) => {
    e.preventDefault();
    if (!course) return;
    setSaving(true);
    try {
      const newLesson = { title: form.title, content: form.content, videoUrl: form.videoUrl || '', duration: Number(form.duration) || 0 };
      const updatedLessons = [...(course.lessons || []), newLesson];
      const res = await apiClient.put(`/courses/${id}`, { lessons: updatedLessons });
      setCourse(res.data.course);
      setForm({ title: '', content: '', videoUrl: '', duration: '' });
      toast.success('Lesson added!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add lesson');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if (!window.confirm('Remove this lesson?')) return;
    try {
      const updatedLessons = course.lessons.filter(l => l._id !== lessonId);
      const res = await apiClient.put(`/courses/${id}`, { lessons: updatedLessons });
      setCourse(res.data.course);
      toast.success('Lesson removed');
    } catch {
      toast.error('Failed to remove lesson');
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto px-4 py-10 animate-pulse"><div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div></div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      <button onClick={() => navigate('/instructor/manage-courses')} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-6">
        <FiArrowLeft /> Back to Courses
      </button>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white">Manage Lessons</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">{course?.title}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Add Lesson Form */}
        <div className="card p-6 dark:bg-slate-800 dark:border-slate-700">
          <h2 className="text-lg font-bold text-secondary dark:text-white mb-5 flex items-center gap-2">
            <FiPlus className="text-primary" /> Add New Lesson
          </h2>
          <form onSubmit={handleAddLesson} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Lesson Title *</label>
              <input type="text" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="e.g., Introduction to React" required className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content / Description *</label>
              <textarea value={form.content} onChange={e => setForm({...form, content: e.target.value})} placeholder="Lesson description or notes..." required rows={3} className="input-field resize-none dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Video URL (optional)</label>
              <input type="url" value={form.videoUrl} onChange={e => setForm({...form, videoUrl: e.target.value})} placeholder="https://youtube.com/embed/..." className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
              <input type="number" min="0" value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} placeholder="e.g., 15" className="input-field dark:bg-slate-700 dark:border-slate-600 dark:text-white" />
            </div>
            <button type="submit" disabled={saving} className="btn-primary w-full">
              {saving ? 'Adding...' : 'Add Lesson'}
            </button>
          </form>
        </div>

        {/* Lessons List */}
        <div>
          <h2 className="text-lg font-bold text-secondary dark:text-white mb-5">
            Course Lessons ({course?.lessons?.length || 0})
          </h2>
          {!course?.lessons?.length ? (
            <div className="card p-8 text-center dark:bg-slate-800 dark:border-slate-700">
              <p className="text-gray-400">No lessons yet. Add your first lesson.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {course.lessons.map((lesson, idx) => (
                <div key={lesson._id || idx} className="card p-4 dark:bg-slate-800 dark:border-slate-700 flex items-start gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 text-primary text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-secondary dark:text-white text-sm">{lesson.title}</p>
                    {lesson.content && <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{lesson.content}</p>}
                    <div className="flex items-center gap-3 mt-1">
                      {lesson.videoUrl && <span className="flex items-center gap-1 text-xs text-green-600"><FiPlay /> Video</span>}
                      {lesson.duration > 0 && <span className="text-xs text-gray-400">{lesson.duration} min</span>}
                    </div>
                  </div>
                  <button onClick={() => handleDeleteLesson(lesson._id)} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors flex-shrink-0">
                    <FiTrash2 className="text-sm" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadLessons;
