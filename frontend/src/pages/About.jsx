import React from 'react';
import { Link } from 'react-router-dom';
import { FiCode, FiDatabase, FiLayout, FiShield, FiArrowRight } from 'react-icons/fi';

const features = [
  { icon: FiCode, title: 'Modern Tech Stack', desc: 'Built with React, Node.js, Express, and MongoDB following industry best practices.' },
  { icon: FiShield, title: 'Secure Authentication', desc: 'JWT-based auth with bcrypt password hashing and role-based access control.' },
  { icon: FiDatabase, title: 'Scalable Architecture', desc: 'Clean MVC architecture with modular routes, controllers, and Mongoose models.' },
  { icon: FiLayout, title: 'Responsive Design', desc: 'Fully responsive UI built with TailwindCSS, optimized for all screen sizes.' },
];

const About = () => (
  <div className="dark:bg-slate-900 min-h-screen">
    <div className="bg-gradient-to-r from-secondary to-slate-700 text-white py-16">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">About LearnHub LMS</h1>
        <p className="text-slate-300 text-lg leading-relaxed">
          A full-featured Learning Management System built with the MERN stack,
          designed to empower students, instructors, and administrators.
        </p>
      </div>
    </div>

    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid sm:grid-cols-2 gap-6 mb-16">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="card p-6 dark:bg-slate-800 dark:border-slate-700">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
              <Icon className="text-primary text-xl" />
            </div>
            <h3 className="font-bold text-secondary dark:text-white mb-2">{title}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="card p-8 dark:bg-slate-800 dark:border-slate-700 text-center">
        <h2 className="text-2xl font-bold text-secondary dark:text-white mb-3">Ready to Start Learning?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Join thousands of learners on LearnHub today.</p>
        <div className="flex justify-center gap-4">
          <Link to="/courses" className="btn-primary flex items-center gap-2">
            Browse Courses <FiArrowRight />
          </Link>
          <Link to="/register" className="btn-outline">Create Account</Link>
        </div>
      </div>
    </div>
  </div>
);

export default About;
