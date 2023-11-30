import express from 'express';
import signIn from './controllers/signInController.js';
import signUp from './controllers/signUpController.js';
import findUser from './controllers/findUserController.js';
const route = express();

route.use ('/signIn', signIn)
route.use ('/signUp', signUp)
route.use ('/findUser', findUser)

export default route;
