import mongoose from 'mongoose';

const optionsSchema = mongoose.Schema({
  optionText: {
    type: String,
  },
});

const questionsSchema = mongoose.Schema({
  questionNumber: {
    type: Number,
  },
  questionText: {
    type: String,
  },
  options: [optionsSchema],
  correctAnswer: {
    type: Number,
  },
  tags: [{ type: String }]
});

const quizModel = mongoose.Schema({
  quizTitle: {
    type: String,
  },
  created_by: {
    type: String,
  },
  questions: [questionsSchema],
});

const Quiz = mongoose.model('Quiz', quizModel);

export default Quiz;
