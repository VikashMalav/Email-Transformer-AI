import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  originalEmail: {
    type: String,
    required: true,
  },
  generatedReply: {
    type: String,
    required: true,
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
