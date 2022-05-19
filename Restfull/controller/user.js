const USERS = require('../models/user');
const catchAsync = require('../utils/catchAsync');

const findUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await USERS.findById(id);

  if (user === null) {
    next();
  }
  res.user = user;
  next();
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await USERS.find();
  res.json({
    message: 'succuss',
    data: users,
    success: true,
  });
});

const getOneUser = catchAsync(async (req, res, next) => {
  res.json({ message: 'success', data: res.user, success: true });
});

const createNewUser = catchAsync(async (req, res, next) => {
  await USERS.create(req.body);
  res.json({
    message: 'succuss',
    data: req.body,
    success: true,
  });
});

// Add routes to suspend/unsuspend user

const updateUser = catchAsync(async (req, res, next) => {
  const { user, body } = req;

  const updatedUser = await USERS.updateOne(user, body, { new: true });
  res.json({
    message: 'succuss',
    data: updatedUser,
    success: true,
  });
});

module.exports = {
  findUserById,
  getAllUsers,
  getOneUser,
  createNewUser,
  updateUser,
};
