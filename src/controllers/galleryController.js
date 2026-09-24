import GalleryAlbum from '../models/GalleryAlbum.js';

export const getAlbums = async (req, res) => {
  try {
    const albums = await GalleryAlbum.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: albums.length, data: albums });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAlbum = async (req, res) => {
  try {
    const album = await GalleryAlbum.create(req.body);
    res.status(201).json({ success: true, message: 'Album created', data: album });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const album = await GalleryAlbum.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.status(200).json({ success: true, message: 'Album updated', data: album });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const album = await GalleryAlbum.findByIdAndDelete(req.params.id);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });
    res.status(200).json({ success: true, message: 'Album deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addImageToAlbum = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    if (!imageUrl) return res.status(400).json({ success: false, message: 'Image URL required' });

    const album = await GalleryAlbum.findById(req.params.id);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });

    album.images.push(imageUrl);
    if (!album.coverImage) album.coverImage = imageUrl;
    await album.save();

    res.status(200).json({ success: true, message: 'Image added to album', data: album });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeImageFromAlbum = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const album = await GalleryAlbum.findById(req.params.id);
    if (!album) return res.status(404).json({ success: false, message: 'Album not found' });

    album.images = album.images.filter((img) => img !== imageUrl);
    if (album.coverImage === imageUrl) {
      album.coverImage = album.images[0] || '';
    }
    await album.save();

    res.status(200).json({ success: true, message: 'Image removed from album', data: album });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderAlbums = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'orderedIds array required' });
    }

    const updates = orderedIds.map((id, index) =>
      GalleryAlbum.findByIdAndUpdate(id, { order: index })
    );
    await Promise.all(updates);

    const albums = await GalleryAlbum.find().sort({ order: 1 });
    res.status(200).json({ success: true, message: 'Albums reordered', data: albums });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
