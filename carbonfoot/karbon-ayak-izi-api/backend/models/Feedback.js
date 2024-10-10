const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;
const Feedback = require('./models/Feedback');


app.post('/feedback', async (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId; 

  try {
    const feedback = new Feedback({ userId, content });
    await feedback.save();
    res.status(201).json({ message: 'Geri bildirim başarıyla kaydedildi.' });
  } catch (error) {
    res.status(400).json({ error: 'Geri bildirim kaydedilirken bir hata oluştu.' });
  }
});
