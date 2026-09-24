import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    techStack: [
      {
        type: String,
        trim: true,
      },
    ],
    links: {
      github: { type: String, default: '' },
      live: { type: String, default: '' },
      demo: { type: String, default: '' },
    },
    image: {
      type: String,
      default: '',
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
