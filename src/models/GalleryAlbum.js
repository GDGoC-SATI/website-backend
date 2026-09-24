import mongoose from 'mongoose';

const galleryAlbumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Album title is required'],
      trim: true,
    },
    type: {
      type: String,
      default: 'Event',
    },
    year: {
      type: String,
      default: () => new Date().getFullYear().toString(),
    },
    coverImage: {
      type: String,
      default: '',
    },
    images: [
      {
        type: String,
      },
    ],
    order: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model('GalleryAlbum', galleryAlbumSchema);
