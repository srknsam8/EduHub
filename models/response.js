import mongoose from 'mongoose';

const responseSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
  },
  responses: [
    {
      questionId: {
        type: Number,
      },
      answerId: {
        type: Number,
      },
    },
  ],
});

const Response = mongoose.model('Response', responseSchema);

export default Response;
