const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Lesson title is required'], trim: true },
    videoURL: { type: String, default: '' },
    resources: [{ name: String, url: String }],
    duration: { type: Number, default: 0 }, // in minutes
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
