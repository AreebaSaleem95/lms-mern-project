import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiBook, FiStar, FiClock } from 'react-icons/fi';

const levelColors = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
};

const CourseCard = ({ course }) => {
  return (
    <div className="card group hover:shadow-md transition-shadow duration-200 dark:bg-slate-800 dark:border-slate-700">
      {/* Thumbnail */}
      <div className="relative h-44 bg-gradient-to-br from-primary/80 to-blue-700 overflow-hidden">
        {course.thumbnail ? (
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FiBook className="text-white text-5xl opacity-40" />
          </div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`badge ${levelColors[course.level] || 'bg-blue-100 text-blue-700'}`}>
            {course.level || 'Beginner'}
          </span>
        </div>
        {course.price === 0 && (
          <div className="absolute top-3 right-3">
            <span className="badge bg-green-500 text-white">Free</span>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Category */}
        <p className="text-xs font-semibold text-primary uppercase tracking-wide mb-2">{course.category}</p>

        {/* Title */}
        <h3 className="font-bold text-secondary dark:text-white text-base leading-snug mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">
            {course.instructor?.name?.charAt(0) || 'I'}
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400">{course.instructor?.name || 'Instructor'}</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-3 text-xs text-gray-400 dark:text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FiBook /> {course.lessons?.length || 0} lessons
          </span>
          <span className="flex items-center gap-1">
            <FiUser /> {course.totalStudents || 0} students
          </span>
          {course.rating > 0 && (
            <span className="flex items-center gap-1">
              <FiStar className="text-yellow-400" /> {course.rating}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
          <span className="text-xl font-bold text-secondary dark:text-white">
            {course.price === 0 ? 'Free' : `$${course.price}`}
          </span>
          <Link
            to={`/courses/${course._id}`}
            className="btn-primary text-sm py-2 px-4"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
