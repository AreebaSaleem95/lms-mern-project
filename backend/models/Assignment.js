const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fileUrl: { type: String, default: '' },
  text: { type: String, default: '' },
  grade: { type: Number, default: null },
  feedback: { type: String, default: '' },
  submittedAt: { type: Date, default: Date.now },
});

const assignmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Assignment title is required'], trim: true },
    instructions: { type: String, required: [true, 'Instructions are required'] },
    deadline: { type: Date, required: [true, 'Deadline is required'] },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    submissions: [submissionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Assignment', assignmentSchema);
