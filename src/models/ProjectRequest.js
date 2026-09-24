import mongoose from 'mongoose';

const projectRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Requester name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Requester email is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    sourceCode: {
      type: String,
      default: '',
    },
    liveUrl: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model('ProjectRequest', projectRequestSchema);
