const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/user');
const articleRouter = require('./routes/article');
const commentRouter = require('./routes/comment');
const hateoasRouter = require('./routes/hateoas');

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/v1', hateoasRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/comments', commentRouter);

app.all('*', (req, res) => {
  res.json({
    status: 'Failure',
    message: 'wrong url',
  });
});

// global error Handler
app.use((err, req, res, next) => {
  res.status(res.statusCode).json({ message: 'Failure', err, success: false });
});

module.exports = app;
