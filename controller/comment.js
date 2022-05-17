const ARTICLE = require('../models/article');
const COMMENT = require('../models/comment');

const catchAsync = require('../utils/catchAsync');

const findCommentByid = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await COMMENT.findById(id);

  if (comment === null) {
    next();
  }
  res.comment = comment;
  next();
});

const getAllComment = catchAsync(async (req, res, next) => {
  const comments = await COMMENT.find();
  res.json({
    message: 'succuss',
    data: comments,
    success: true,
  });
});

const createNewComment = catchAsync(async (req, res, next) => {
  const { username, content, article } = req.body;
  const articleRelated = await ARTICLE.findById(article);
  if (!articleRelated) next();
  const comment = await COMMENT.create({ username, content, article });
  articleRelated.comments.push(comment);
  await articleRelated.save();
  res
    .status(200)
    .json({ success: true, data: comment, message: 'new Comment is created' });
});

const getOneComment = catchAsync(async (req, res, next) => {
  res.json({
    message: 'succuss',
    data: req.comment,
    success: true,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { comment, body } = req;

  const updatedComment = await COMMENT.updateOne(comment, body, { new: true });
  res.json({
    message: 'succuss',
    data: updatedComment,
    success: true,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { comment, body } = req;

  const deletedComment = await COMMENT.deleteOne(comment, body, { new: true });
  res.json({
    message: 'succuss',
    data: deletedComment,
    success: true,
  });
});

module.exports = {
  findCommentByid,
  getAllComment,
  getOneComment,
  updateComment,
  deleteComment,
  createNewComment,
};
