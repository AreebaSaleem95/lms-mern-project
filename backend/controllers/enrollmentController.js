const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) return res.status(400).json({ message: 'courseId is required' });

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    const enrollment = await Enrollment.create({ student: req.user._id, course: courseId, progress: 0 });

    // Increment totalStudents on course
    await Course.findByIdAndUpdate(courseId, { $inc: { totalStudents: 1 } });

    return res.status(201).json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    if (error.code === 11000) return res.status(400).json({ message: 'Already enrolled in this course' });
    console.error('Enroll error:', error.message);
    return res.status(500).json({ message: 'Server error while enrolling' });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id }).populate({
      path: 'course',
      populate: { path: 'instructor', select: 'name email' },
    });
    return res.status(200).json({ enrollments });
  } catch (error) {
    console.error('Get my courses error:', error.message);
    return res.status(500).json({ message: 'Server error while fetching enrolled courses' });
  }
};

const updateProgress = async (req, res) => {
  try {
    const { courseId, lessonId } = req.body;
    const enrollment = await Enrollment.findOne({ student: req.user._id, course: courseId });
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });

    if (!enrollment.completedLessons.includes(lessonId)) {
      enrollment.completedLessons.push(lessonId);
    }

    const course = await Course.findById(courseId);
    const totalLessons = course?.lessons?.length || 1;
    enrollment.progress = Math.round((enrollment.completedLessons.length / totalLessons) * 100);
    if (enrollment.progress >= 100) {
      enrollment.isCompleted = true;
      enrollment.completedAt = new Date();
    }
    await enrollment.save();
    return res.status(200).json({ message: 'Progress updated', enrollment });
  } catch (error) {
    console.error('Update progress error:', error.message);
    return res.status(500).json({ message: 'Server error while updating progress' });
  }
};

const getAllEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
      .populate('student', 'name email')
      .populate('course', 'title');
    return res.status(200).json({ enrollments });
  } catch (error) {
    console.error('Get all enrollments error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { enrollInCourse, getMyCourses, updateProgress, getAllEnrollments };
