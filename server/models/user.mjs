import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firebaseUserId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  tasks: [
    {
      name: String,
      sessionTime: Number,
      breakTime: Number,
    }
  ],
  sessions: [
    {
      task: String,
      date: Date,
      timeCompleted: Number,
    }
  ]
});

const User = mongoose.model('User', userSchema);

export default User;
