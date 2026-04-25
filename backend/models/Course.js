const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Lesson title is required'], trim: true },
    content: { type: String, default: '' },
    videoUrl: { type: String, default: '' },
    duration: { type: Number, default: 0 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, 'Course title is required'], trim: true },
    description: { type: String, required: [true, 'Course description is required'] },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: [true, 'Course category is required'], trim: true },
    price: { type: Number, required: [true, 'Course price is required'], min: [0, 'Price cannot be negative'] },
    thumbnail: { type: String, default: '' },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    language: { type: String, default: 'English' },
    isPublished: { type: Boolean, default: true },
    lessons: [lessonSchema],
    totalStudents: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);
