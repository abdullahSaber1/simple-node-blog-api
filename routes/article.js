const express = require('express');
const {
  getArticles,
  createNewArticle,
  findArticleByid,
  getArticleByID,
  updateArticle,
  deleteArticle,
  listArticleComments,
} = require('../controller/article');

const articleRouter = express.Router();

articleRouter.route('/').get(getArticles).post(createNewArticle);
articleRouter.use('/:id', findArticleByid);
articleRouter.get('/:id/comments', listArticleComments);
articleRouter
  .route('/:id')
  .get(getArticleByID)
  .patch(updateArticle)
  .delete(deleteArticle);

module.exports = articleRouter;
