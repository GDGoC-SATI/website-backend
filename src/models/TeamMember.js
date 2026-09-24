import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Member name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      trim: true,
    },
    subRole: {
      type: String,
      default: '',
    },
    category: {
      type: String,
      enum: ['lead', 'technical', 'social', 'events', 'management'],
      required: true,
      default: 'technical',
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
    socials: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      twitter: { type: String, default: '' },
      instagram: { type: String, default: '' },
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('TeamMember', teamMemberSchema);
