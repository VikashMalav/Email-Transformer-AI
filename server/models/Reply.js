import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  messages: [{
    role: { type: String, enum: ['user', 'assistant'], required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  title: {
    type: String,
    default: 'New Conversation'
  },
  tone: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reply = mongoose.model('Reply', replySchema);
export default Reply;
