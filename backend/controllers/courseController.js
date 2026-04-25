const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');

const getAllCourses = async (req, res) => {
  try {
    const { category, search } = req.query;
    let filter = {};
    if (category) filter.category = { $regex: category, $options: 'i' };
    if (search) filter.title = { $regex: search, $options: 'i' };

    const courses = await Course.find(filter).populate('instructor', 'name email avatar');
    return res.status(200).json({ courses });
  } catch (error) {
    console.error('Get all courses error:', error.message);
    return res.status(500).json({ message: 'Server error while fetching courses' });
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'name email avatar bio');
    if (!course) return res.status(404).json({ message: 'Course not found' });
    return res.status(200).json({ course });
  } catch (error) {
    console.error('Get course by id error:', error.message);
    return res.status(500).json({ message: 'Server error while fetching course' });
  }
};

const createCourse = async (req, res) => {
  try {
    const { title, description, category, price, thumbnail, level, language, lessons } = req.body;
    if (!title || !description || !category || price === undefined) {
      return res.status(400).json({ message: 'Title, description, category, and price are required' });
    }
    const course = await Course.create({
      title, description, category, price,
      thumbnail: thumbnail || '',
      level: level || 'Beginner',
      language: language || 'English',
      instructor: req.user._id,
      lessons: lessons || [],
    });
    return res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error('Create course error:', error.message);
    return res.status(500).json({ message: 'Server error while creating course' });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this course' });
    }
    const fields = ['title', 'description', 'category', 'price', 'thumbnail', 'level', 'language', 'lessons', 'isPublished'];
    fields.forEach((f) => { if (req.body[f] !== undefined) course[f] = req.body[f]; });
    const updated = await course.save();
    return res.status(200).json({ message: 'Course updated successfully', course: updated });
  } catch (error) {
    console.error('Update course error:', error.message);
    return res.status(500).json({ message: 'Server error while updating course' });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this course' });
    }
    await course.deleteOne();
    return res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error.message);
    return res.status(500).json({ message: 'Server error while deleting course' });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse };
