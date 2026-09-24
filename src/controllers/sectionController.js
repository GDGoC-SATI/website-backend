import SiteSection from '../models/SiteSection.js';

export const getSection = async (req, res) => {
  try {
    const section = await SiteSection.findOne({ sectionKey: req.params.key });
    if (!section) {
      return res.status(200).json({ success: true, data: null });
    }
    res.status(200).json({ success: true, data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllSections = async (req, res) => {
  try {
    const sections = await SiteSection.find();
    res.status(200).json({ success: true, data: sections });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const { title, description, data } = req.body;
    const section = await SiteSection.findOneAndUpdate(
      { sectionKey: req.params.key },
      {
        sectionKey: req.params.key,
        title,
        description,
        data,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ success: true, message: 'Section updated', data: section });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
