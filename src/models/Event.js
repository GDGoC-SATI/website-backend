import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
    },
    location: {
      type: String,
      default: 'Online',
    },
    description: {
      type: String,
      required: true,
    },
    fullDescription: {
      type: String,
      default: '',
    },
    imageUrl: {
      type: String,
      default: '',
    },
    originalUrl: {
      type: String,
      default: '',
    },
    registrationLink: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'Workshop',
    },
    year: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);
