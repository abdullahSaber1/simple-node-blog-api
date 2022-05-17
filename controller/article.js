const ARTICLE = require('../models/article');
const COMMENT = require('../models/comment');
const catchAsync = require('../utils/catchAsync');

const findArticleByid = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const article = await ARTICLE.findById(id);

  if (article === null) {
    next();
  }
  res.article = article;
  next();
});

const getArticles = catchAsync(async (req, res, next) => {
  const articles = await ARTICLE.find();
  res.json({
    message: 'succuss',
    data: articles,
    success: true,
  });
});

const getArticleByID = catchAsync(async (req, res) => {
  res.json({
    message: 'succuss',
    data: res.article,
    success: true,
  });
});

const createNewArticle = catchAsync(async (req, res, next) => {
  const article = await ARTICLE.create(req.body);
  res.json({
    message: 'succuss',
    data: article,
    success: true,
  });
});

const updateArticle = catchAsync(async (req, res) => {
  const { article, body } = req;

  const updatedArticle = await ARTICLE.updateOne(article, body, { new: true });
  res.json({
    message: 'succuss',
    data: updatedArticle,
    success: true,
  });
});

const deleteArticle = catchAsync(async (req, res) => {
  const deletedArticle = await ARTICLE.deleteOne(req.article, { new: true });
  res.json({
    message: 'succuss',
    data: deletedArticle,
    success: true,
  });
});

const listArticleComments = catchAsync(async (req, res, next) => {
  const { comments } = res.article;

  const commentsList = await COMMENT.find({ _id: { $in: comments } });

  res.status(200).json({
    success: true,
    data: commentsList,
    message: 'article comments are fetched',
  });
});

module.exports = {
  findArticleByid,
  getArticles,
  createNewArticle,
  updateArticle,
  deleteArticle,
  getArticleByID,
  listArticleComments,
};
