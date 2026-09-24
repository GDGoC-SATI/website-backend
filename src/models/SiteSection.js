import mongoose from 'mongoose';

const siteSectionSchema = new mongoose.Schema(
  {
    sectionKey: {
      type: String,
      required: true,
      unique: true,
    },
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

export default mongoose.model('SiteSection', siteSectionSchema);
