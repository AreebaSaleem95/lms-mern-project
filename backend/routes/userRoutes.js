const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const { getAllUsers, deleteUser, updateUserRole, getAnalytics } = require('../controllers/userController');

const router = express.Router();

router.get('/', protect, authorizeRoles('admin'), getAllUsers);
router.get('/analytics', protect, authorizeRoles('admin'), getAnalytics);
router.put('/:id/role', protect, authorizeRoles('admin'), updateUserRole);
router.delete('/:id', protect, authorizeRoles('admin'), deleteUser);

module.exports = router;
