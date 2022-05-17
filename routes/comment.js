const express = require('express');
const {
  getAllComment,
  createNewComment,
  findCommentByid,
  getOneComment,
  updateComment,
  deleteComment,
} = require('../controller/comment');

const commentRouter = express.Router();

commentRouter.route('/').get(getAllComment).post(createNewComment);
commentRouter.use('/:id', findCommentByid);
commentRouter
  .route('/:id')
  .get(getOneComment)
  .patch(updateComment)
  .delete(deleteComment);

module.exports = commentRouter;
