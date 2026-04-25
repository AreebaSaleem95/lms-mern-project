const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse } = require('../controllers/courseController');

const router = express.Router();

router.get('/', getAllCourses);
router.get('/:id', getCourseById);
router.post('/', protect, authorizeRoles('instructor', 'admin'), createCourse);
router.put('/:id', protect, authorizeRoles('instructor', 'admin'), updateCourse);
router.delete('/:id', protect, authorizeRoles('instructor', 'admin'), deleteCourse);

module.exports = router;
