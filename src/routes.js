import express from 'express';
import signUp from './controllers/signUpController.js';
import signIn from './controllers/signInController.js';
import { verifyToken } from './middlewares/jwt.js';
import findUser from './controllers/findUserController.js';
const route = express();

route.use ('/signUp', signUp)
route.use ('/signIn', signIn)
route.use ('/findUser', verifyToken, findUser)


export default route;
