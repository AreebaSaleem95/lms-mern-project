const User = require('../models/User');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Get all users error:', error.message);
    return res.status(500).json({ message: 'Server error while fetching users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await user.deleteOne();
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error.message);
    return res.status(500).json({ message: 'Server error while deleting user' });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    if (!['admin', 'instructor', 'student'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({ message: 'Role updated', user });
  } catch (error) {
    console.error('Update role error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const [userCount, courseCount, enrollmentCount] = await Promise.all([
      User.countDocuments(),
      Course.countDocuments(),
      Enrollment.countDocuments(),
    ]);
    const roleBreakdown = await User.aggregate([
      { $group: { _id: '$role', count: { $sum: 1 } } },
    ]);
    return res.status(200).json({ userCount, courseCount, enrollmentCount, roleBreakdown });
  } catch (error) {
    console.error('Analytics error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getAllUsers, deleteUser, updateUserRole, getAnalytics };
