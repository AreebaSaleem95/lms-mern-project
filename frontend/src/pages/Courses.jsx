import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch, FiFilter } from 'react-icons/fi';
import CourseCard from '../components/CourseCard.jsx';
import apiClient from '../services/api.js';

const categories = ['All', 'Web Development', 'Data Science', 'Design', 'Business', 'Marketing', 'Photography'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiClient.get('/courses');
        setCourses(res.data.courses || []);
      } catch {
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    let result = [...courses];
    if (search) result = result.filter(c => c.title.toLowerCase().includes(search.toLowerCase()) || c.description?.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory !== 'All') result = result.filter(c => c.category === selectedCategory);
    if (selectedLevel !== 'All') result = result.filter(c => c.level === selectedLevel);
    setFiltered(result);
  }, [courses, search, selectedCategory, selectedLevel]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 dark:bg-slate-900 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-secondary dark:text-white mb-2">All Courses</h1>
        <p className="text-gray-500 dark:text-gray-400">{filtered.length} courses available</p>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field pl-10 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="input-field w-full sm:w-48 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="input-field w-full sm:w-40 dark:bg-slate-800 dark:border-slate-600 dark:text-white"
        >
          {levels.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className="card animate-pulse dark:bg-slate-800">
              <div className="h-44 bg-gray-200 dark:bg-slate-700"></div>
              <div className="p-5 space-y-3">
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-full"></div>
                <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No courses found</h3>
          <p className="text-gray-400">Try adjusting your search or filters</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
