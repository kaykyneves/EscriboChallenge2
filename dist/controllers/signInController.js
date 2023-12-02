"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _signInServicesjs = require('../services/signInServices.js'); var _signInServicesjs2 = _interopRequireDefault(_signInServicesjs);
var _bcryptHelperjs = require('../helpers/bcryptHelper.js'); var _bcryptHelperjs2 = _interopRequireDefault(_bcryptHelperjs);
var _jwtjs = require('../middlewares/jwt.js'); var _jwtjs2 = _interopRequireDefault(_jwtjs);
const routes = _express2.default.Router();

routes.post('/', async (request, response) => {
    try {
        const { email, senha } = request.body;

        const { message, designCheck, query_password } = await _signInServicesjs2.default.login(email, senha);
        const tokenUser = { email: email, senha: senha };
        const token = _jwtjs2.default.sign(tokenUser, 60 * 30);

        const newDesign = {...designCheck, token}
        if (message === 0) {
            response.status(401).send({ message: "Usuário e/ou senha inválidos" });
        } else {

            const verifySenha = await _bcryptHelperjs2.default.passwordCheck(senha, query_password);
     
            if (!verifySenha) {
                response.status(401).send({message: "Usuário e/ou senha inválidos"});
                return;
            }

            response.status(200).send({ newDesign });
        }
    } catch (error) {
        response.status(500).send(`Houve algum erro no banco de dados ${error}`);
    }
});

exports. default = routes;
