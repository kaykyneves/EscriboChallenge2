"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _signUpServicesjs = require('../services/signUpServices.js'); var _signUpServicesjs2 = _interopRequireDefault(_signUpServicesjs);
var _bcryptHelperjs = require('../helpers/bcryptHelper.js'); var _bcryptHelperjs2 = _interopRequireDefault(_bcryptHelperjs);
var _jwtjs = require('../middlewares/jwt.js'); var _jwtjs2 = _interopRequireDefault(_jwtjs);
const routes = _express2.default.Router();
routes.post('/', async (request, response) => {
    try{
        const{nome, email, senha, telefones} = request.body;

        const criptoSenha = await _bcryptHelperjs2.default.criptoPassword(senha);
        const phones = telefones.map(phone => {
            return {
                telefone: phone.telefone,
                
                ddd: phone.ddd
            };
          
        });

        const tokenUser = { nome: nome, email: email };

        

        const token = _jwtjs2.default.sign(tokenUser, 60 * 30);
        const {message, designCheck} = await _signUpServicesjs2.default.createEmployee(nome, email, criptoSenha, phones);
        const newDesign = {...designCheck, token}

        if (message === 0) {
            response.status(401).send({message: "E-mail já existente!"})
        }

        else {
            response.status(201).send({newDesign})
        }
    }

    catch (error) {
        response.status(500).send(`Erro na requisição! ${error}`);
    }
});

exports. default = routes;
