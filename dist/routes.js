"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _signUpControllerjs = require('./controllers/signUpController.js'); var _signUpControllerjs2 = _interopRequireDefault(_signUpControllerjs);
var _signInControllerjs = require('./controllers/signInController.js'); var _signInControllerjs2 = _interopRequireDefault(_signInControllerjs);
var _jwtjs = require('./middlewares/jwt.js');
var _findUserControllerjs = require('./controllers/findUserController.js'); var _findUserControllerjs2 = _interopRequireDefault(_findUserControllerjs);
const route = _express2.default.call(void 0, );

route.use ('/signUp', _signUpControllerjs2.default)
route.use ('/signIn', _signInControllerjs2.default)
route.use ('/findUser', _jwtjs.verifyToken, _findUserControllerjs2.default)


exports. default = route;
