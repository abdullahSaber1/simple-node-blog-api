const express = require('express');

const baseRouter = express.Router();

// TODO::GET
baseRouter.get('/', (req, res, next) => {
  res.status(201).json({
    'Get all users ': 'http://localhost:8000/api/v1/users/',
    'Get specific user ': 'http://localhost:8000/api/v1/users/{:id}',
    'Get all Articles ': 'http://localhost:8000/api/v1/articles/',
    'Get specific Article ': 'http://localhost:8000/api/v1/articles/{:id}',
    'Get all Comments ': 'http://localhost:8000/api/v1/comments/{:userId}',
    'Get specific Comment ': 'http://localhost:8000/api/v1/comments/{:id}',
  });
});

module.exports = baseRouter;
