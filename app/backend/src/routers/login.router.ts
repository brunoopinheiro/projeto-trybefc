import { Router } from 'express';
import UsersControler from '../controllers/user.controller';
import UsersService from '../services/users.service';
import UserModel from '../database/models/UserModel';
import loginBodyMiddleware from '../middlewares/login.middleware';
import authMiddleware from '../middlewares/auth.middleware';

const loginRouter = Router();

const userService = new UsersService(UserModel);
const usersController = new UsersControler(userService);

loginRouter.post('/', loginBodyMiddleware, usersController.login);
loginRouter.get('/role', authMiddleware, usersController.loginRole);

export default loginRouter;
