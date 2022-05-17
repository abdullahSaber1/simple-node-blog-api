const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    username: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: [true, 'username is required'],
    },
    article: {
      type: mongoose.Types.ObjectId,
      ref: 'articles',
      required: [true, 'article is required'],
    },
  },
  { timestamp: true }
);

const commentModel = mongoose.model('comments', commentSchema);

module.exports = commentModel;
