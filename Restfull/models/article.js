const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
    },
    body: {
      type: String,
      required: [true, 'Body is required'],
    },
    comments: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'comments',
        required: [true, 'Comment is required'],
      },
    ],
  },
  { timeStamp: true }
);

const articleModel = mongoose.model('articles', articleSchema);

module.exports = articleModel;
