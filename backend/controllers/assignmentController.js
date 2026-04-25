const Assignment = require('../models/Assignment');

const createAssignment = async (req, res) => {
  try {
    const { title, instructions, deadline, courseId } = req.body;
    if (!title || !instructions || !deadline || !courseId) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const assignment = await Assignment.create({
      title, instructions, deadline, course: courseId, instructor: req.user._id,
    });
    return res.status(201).json({ message: 'Assignment created', assignment });
  } catch (error) {
    console.error('Create assignment error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const getCourseAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({ course: req.params.courseId })
      .populate('instructor', 'name');
    return res.status(200).json({ assignments });
  } catch (error) {
    console.error('Get assignments error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const submitAssignment = async (req, res) => {
  try {
    const { text, fileUrl } = req.body;
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    const alreadySubmitted = assignment.submissions.find(
      (s) => s.student.toString() === req.user._id.toString()
    );
    if (alreadySubmitted) return res.status(400).json({ message: 'Already submitted' });

    assignment.submissions.push({ student: req.user._id, text, fileUrl });
    await assignment.save();
    return res.status(201).json({ message: 'Submitted successfully' });
  } catch (error) {
    console.error('Submit assignment error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

const gradeSubmission = async (req, res) => {
  try {
    const { studentId, grade, feedback } = req.body;
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) return res.status(404).json({ message: 'Assignment not found' });

    const submission = assignment.submissions.find(
      (s) => s.student.toString() === studentId
    );
    if (!submission) return res.status(404).json({ message: 'Submission not found' });

    submission.grade = grade;
    submission.feedback = feedback || '';
    await assignment.save();
    return res.status(200).json({ message: 'Graded successfully' });
  } catch (error) {
    console.error('Grade submission error:', error.message);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createAssignment, getCourseAssignments, submitAssignment, gradeSubmission };
