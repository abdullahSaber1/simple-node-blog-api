const express = require('express');
const {
  getAllUsers,
  createNewUser,
  getOneUser,
  findUserById,
  updateUser,
} = require('../controller/user');

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createNewUser);
userRouter.use('/:id', findUserById);
userRouter.route('/:id').get(getOneUser).patch(updateUser);

module.exports = userRouter;
