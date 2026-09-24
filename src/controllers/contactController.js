import ContactQuery from '../models/ContactQuery.js';

export const submitQuery = async (req, res) => {
  try {
    const { firstName, lastName, email, subject, message } = req.body;
    if (!firstName || !email || !message) {
      return res.status(400).json({ success: false, message: 'First name, email, and message are required' });
    }

    const query = await ContactQuery.create({
      firstName,
      lastName: lastName || '',
      email,
      subject: subject || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We will get back to you soon.',
      data: query,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQueries = async (req, res) => {
  try {
    const queries = await ContactQuery.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: queries.length, data: queries });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateQueryStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const query = await ContactQuery.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!query) return res.status(404).json({ success: false, message: 'Query not found' });
    res.status(200).json({ success: true, message: 'Status updated', data: query });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteQuery = async (req, res) => {
  try {
    await ContactQuery.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Query deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
