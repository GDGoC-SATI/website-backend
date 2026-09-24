import mongoose from 'mongoose';

const alumniSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Alumni name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    era: {
      type: String,
      default: 'The Visionaries',
    },
    bio: {
      type: String,
      default: '',
    },
    skills: [{ type: String }],
    image: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '#4285F4',
    },
    linkedin: { type: String, default: '' },
    github: { type: String, default: '' },
    instagram: { type: String, default: '' },
    batch: { type: String, default: '2025' },
    org: { type: String, default: 'GDSC' },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Alumni', alumniSchema);
