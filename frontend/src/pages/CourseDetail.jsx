import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiPlay, FiBook, FiUser, FiClock, FiStar, FiCheck, FiLock } from 'react-icons/fi';
import apiClient from '../services/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';

const CourseDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await apiClient.get(`/courses/${id}`);
        setCourse(res.data.course);
        if (res.data.course.lessons?.length > 0) {
          setActiveLesson(res.data.course.lessons[0]);
        }
      } catch {
        toast.error('Failed to load course');
      } finally {
        setLoading(false);
      }
    };

    const checkEnrollment = async () => {
      if (!user) return;
      try {
        const res = await apiClient.get('/my-courses');
        const enrolled = (res.data.enrollments || []).some(e => e.course?._id === id);
        setIsEnrolled(enrolled);
      } catch {}
    };

    fetchCourse();
    checkEnrollment();
  }, [id, user]);

  const handleEnroll = async () => {
    if (!user) { toast.info('Please login to enroll'); return; }
    if (user.role !== 'student') { toast.warning('Only students can enroll'); return; }
    setEnrolling(true);
    try {
      await apiClient.post('/enroll', { courseId: id });
      setIsEnrolled(true);
      toast.success('Successfully enrolled!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">Course not found.</p>
        <Link to="/courses" className="btn-primary mt-4 inline-block">Back to Courses</Link>
      </div>
    );
  }

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-r from-secondary to-slate-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="badge bg-blue-500/30 text-blue-300 mb-4">{course.category}</span>
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h1>
            <p className="text-slate-300 text-lg mb-6">{course.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <span className="flex items-center gap-1"><FiUser /> {course.instructor?.name}</span>
              <span className="flex items-center gap-1"><FiBook /> {course.lessons?.length || 0} lessons</span>
              <span className="flex items-center gap-1"><FiStar className="text-yellow-400" /> {course.rating || 'New'}</span>
              <span className="badge bg-white/20 text-white capitalize">{course.level}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Video Player */}
            {activeLesson && (
              <div className="card dark:bg-slate-800 dark:border-slate-700">
                <div className="bg-black rounded-t-xl overflow-hidden aspect-video flex items-center justify-center">
                  {activeLesson.videoUrl ? (
                    <iframe
                      src={activeLesson.videoUrl}
                      title={activeLesson.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="text-center text-white">
                      <FiPlay className="text-5xl mx-auto mb-3 opacity-50" />
                      <p className="text-sm opacity-50">No video available for this lesson</p>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-secondary dark:text-white text-lg">{activeLesson.title}</h3>
                  {activeLesson.content && (
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">{activeLesson.content}</p>
                  )}
                </div>
              </div>
            )}

            {/* About Course */}
            <div className="card p-6 dark:bg-slate-800 dark:border-slate-700">
              <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">About This Course</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{course.description}</p>
            </div>

            {/* Instructor */}
            <div className="card p-6 dark:bg-slate-800 dark:border-slate-700">
              <h2 className="text-xl font-bold text-secondary dark:text-white mb-4">Your Instructor</h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {course.instructor?.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-secondary dark:text-white">{course.instructor?.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{course.instructor?.email}</p>
                  {course.instructor?.bio && <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{course.instructor.bio}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="card p-6 sticky top-24 dark:bg-slate-800 dark:border-slate-700">
              <div className="text-3xl font-bold text-secondary dark:text-white mb-4">
                {course.price === 0 ? 'Free' : `$${course.price}`}
              </div>

              {isEnrolled ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <FiCheck /> You're enrolled
                  </div>
                  <Link to="/student/my-courses" className="btn-primary w-full text-center block">
                    Go to My Courses
                  </Link>
                </div>
              ) : (
                <button
                  onClick={handleEnroll}
                  disabled={enrolling || !user}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  {enrolling ? 'Enrolling...' : user ? 'Enroll Now' : 'Login to Enroll'}
                </button>
              )}

              {!user && (
                <p className="text-xs text-gray-400 text-center mt-3">
                  <Link to="/login" className="text-primary hover:underline">Login</Link> or{' '}
                  <Link to="/register" className="text-primary hover:underline">Register</Link> to enroll
                </p>
              )}

              <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-2"><FiBook className="text-primary" /> {course.lessons?.length || 0} lessons</div>
                <div className="flex items-center gap-2"><FiUser className="text-primary" /> {course.totalStudents || 0} students enrolled</div>
                <div className="flex items-center gap-2"><FiClock className="text-primary" /> Language: {course.language || 'English'}</div>
              </div>
            </div>

            {/* Lessons List */}
            {course.lessons?.length > 0 && (
              <div className="card dark:bg-slate-800 dark:border-slate-700">
                <div className="p-4 border-b border-gray-100 dark:border-slate-700">
                  <h3 className="font-bold text-secondary dark:text-white">Course Content</h3>
                  <p className="text-xs text-gray-400 mt-1">{course.lessons.length} lessons</p>
                </div>
                <div className="divide-y divide-gray-100 dark:divide-slate-700">
                  {course.lessons.map((lesson, idx) => (
                    <button
                      key={lesson._id || idx}
                      onClick={() => (isEnrolled || idx === 0) && setActiveLesson(lesson)}
                      className={`w-full flex items-center gap-3 p-4 text-left hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors ${
                        activeLesson?._id === lesson._id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                    >
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        activeLesson?._id === lesson._id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500'
                      }`}>
                        {isEnrolled || idx === 0 ? <FiPlay className="text-xs" /> : <FiLock className="text-xs" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary dark:text-white truncate">{lesson.title}</p>
                        {lesson.duration > 0 && <p className="text-xs text-gray-400">{lesson.duration} min</p>}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
