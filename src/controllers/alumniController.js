import Alumni from '../models/Alumni.js';

export const getAlumni = async (req, res) => {
  try {
    const list = await Alumni.find().sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: list.length, data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createAlumni = async (req, res) => {
  try {
    const item = await Alumni.create(req.body);
    res.status(201).json({ success: true, message: 'Alumni created', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateAlumni = async (req, res) => {
  try {
    const item = await Alumni.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) return res.status(404).json({ success: false, message: 'Alumni not found' });
    res.status(200).json({ success: true, message: 'Alumni updated', data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAlumni = async (req, res) => {
  try {
    const item = await Alumni.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Alumni not found' });
    res.status(200).json({ success: true, message: 'Alumni deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const reorderAlumni = async (req, res) => {
  try {
    const { orderedIds } = req.body;
    if (!Array.isArray(orderedIds)) {
      return res.status(400).json({ success: false, message: 'orderedIds array required' });
    }

    const updates = orderedIds.map((id, index) =>
      Alumni.findByIdAndUpdate(id, { order: index })
    );
    await Promise.all(updates);

    const list = await Alumni.find().sort({ order: 1 });
    res.status(200).json({ success: true, message: 'Alumni order updated', data: list });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
