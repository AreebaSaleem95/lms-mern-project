import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiUsers, FiBook, FiAward, FiStar, FiPlay } from 'react-icons/fi';
import apiClient from '../services/api.js';
import CourseCard from '../components/CourseCard.jsx';

const stats = [
  { label: 'Students Enrolled', value: '10,000+', icon: FiUsers },
  { label: 'Expert Courses', value: '500+', icon: FiBook },
  { label: 'Certificates Issued', value: '8,000+', icon: FiAward },
  { label: 'Average Rating', value: '4.8★', icon: FiStar },
];

const categories = [
  { name: 'Web Development', icon: '💻', color: 'bg-blue-50 text-blue-700' },
  { name: 'Data Science', icon: '📊', color: 'bg-purple-50 text-purple-700' },
  { name: 'Design', icon: '🎨', color: 'bg-pink-50 text-pink-700' },
  { name: 'Business', icon: '💼', color: 'bg-yellow-50 text-yellow-700' },
  { name: 'Marketing', icon: '📣', color: 'bg-green-50 text-green-700' },
  { name: 'Photography', icon: '📷', color: 'bg-orange-50 text-orange-700' },
];

const testimonials = [
  { name: 'Ahmed Khan', role: 'Web Developer', text: 'LearnHub transformed my career. The courses are practical and the instructors are world-class.', avatar: 'A' },
  { name: 'Sara Ali', role: 'Data Analyst', text: 'I landed my dream job after completing the Data Science track. Highly recommended!', avatar: 'S' },
  { name: 'Usman Malik', role: 'UI/UX Designer', text: 'The design courses here are unmatched. I went from beginner to professional in 3 months.', avatar: 'U' },
];

const Home = () => {
  const [featuredCourses, setFeaturedCourses] = useState([]);

  useEffect(() => {
    apiClient.get('/courses').then((res) => {
      setFeaturedCourses((res.data.courses || []).slice(0, 3));
    }).catch(() => {});
  }, []);

  return (
    <div className="dark:bg-slate-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-slate-800 to-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <FiStar className="text-yellow-400" /> #1 Learning Platform in Pakistan
              </span>
              <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
                Upgrade Your Skills with{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Industry-Ready
                </span>{' '}
                Courses
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Join thousands of learners mastering in-demand skills. Expert instructors, hands-on projects, and certificates that employers recognize.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/courses" className="inline-flex items-center gap-2 bg-primary hover:bg-blue-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/30">
                  Explore Courses <FiArrowRight />
                </Link>
                <Link to="/register" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition-all duration-200">
                  <FiPlay /> Watch Demo
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((l, i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 border-2 border-white flex items-center justify-center text-white text-xs font-bold">{l}</div>
                  ))}
                </div>
                <p className="text-slate-300 text-sm"><span className="text-white font-semibold">10,000+</span> students already learning</p>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="space-y-4">
                    {['React & Node.js Bootcamp', 'Python for Data Science', 'UI/UX Design Masterclass'].map((course, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
                        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white">
                          <FiBook />
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{course}</p>
                          <div className="flex items-center gap-1 mt-1">
                            {[1,2,3,4,5].map(s => <FiStar key={s} className="text-yellow-400 text-xs fill-current" />)}
                          </div>
                        </div>
                        <span className="ml-auto text-green-400 text-xs font-medium">Enrolled</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-xl mb-3">
                  <Icon className="text-primary text-xl" />
                </div>
                <p className="text-3xl font-bold text-secondary dark:text-white">{value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-3">Browse Top Categories</h2>
          <p className="text-gray-500 dark:text-gray-400">Explore courses across the most in-demand fields</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ name, icon, color }) => (
            <Link
              key={name}
              to={`/courses?category=${encodeURIComponent(name)}`}
              className={`${color} rounded-xl p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer`}
            >
              <div className="text-3xl mb-2">{icon}</div>
              <p className="text-sm font-semibold">{name}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      {featuredCourses.length > 0 && (
        <section className="bg-gray-50 dark:bg-slate-800/50 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-3xl font-bold text-secondary dark:text-white mb-2">Featured Courses</h2>
                <p className="text-gray-500 dark:text-gray-400">Hand-picked courses by our expert team</p>
              </div>
              <Link to="/courses" className="btn-outline text-sm hidden sm:flex items-center gap-2">
                View All <FiArrowRight />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCourses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-secondary dark:text-white mb-3">What Our Students Say</h2>
          <p className="text-gray-500 dark:text-gray-400">Real stories from real learners</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, text, avatar }) => (
            <div key={name} className="card p-6 dark:bg-slate-800 dark:border-slate-700">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map(s => <FiStar key={s} className="text-yellow-400 fill-current text-sm" />)}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">"{text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                  {avatar}
                </div>
                <div>
                  <p className="font-semibold text-secondary dark:text-white text-sm">{name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-primary to-blue-700 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Start Learning?</h2>
          <p className="text-blue-100 text-lg mb-8">Join over 10,000 students and start your learning journey today.</p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-3.5 rounded-xl hover:bg-blue-50 transition-colors duration-200 shadow-lg">
            Start for Free <FiArrowRight />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
