const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { createAssignment, getCourseAssignments, submitAssignment, gradeSubmission } = require('../controllers/assignmentController');

const router = express.Router();

router.post('/', protect, authorizeRoles('instructor', 'admin'), createAssignment);
router.get('/course/:courseId', protect, getCourseAssignments);
router.post('/:id/submit', protect, authorizeRoles('student'), submitAssignment);
router.put('/:id/grade', protect, authorizeRoles('instructor', 'admin'), gradeSubmission);

module.exports = router;
