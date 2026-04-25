const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { enrollInCourse, getMyCourses, updateProgress, getAllEnrollments } = require('../controllers/enrollmentController');

const router = express.Router();

router.post('/enroll', protect, authorizeRoles('student'), enrollInCourse);
router.get('/my-courses', protect, getMyCourses);
router.put('/progress', protect, updateProgress);
router.get('/all-enrollments', protect, authorizeRoles('admin'), getAllEnrollments);

module.exports = router;
