const express = require('express');
//controllers
const {
  getAllUsers,
  createUser,
  login,
  updateUser,
  deleteUser,
} = require('../controllers/users.controller');
//Middlewares
const { userExist } = require('../middleware/userExist.middleware');
const {
  protectSession,
  verifyUserAccount,
} = require('../middleware/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter
  .use('/:id', userExist)
  .route('/:id')
  .patch(verifyUserAccount, updateUser)
  .delete(verifyUserAccount, deleteUser);

module.exports = { usersRouter };
