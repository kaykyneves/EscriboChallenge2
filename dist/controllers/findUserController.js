"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _findUserServicesjs = require('../services/findUserServices.js'); var _findUserServicesjs2 = _interopRequireDefault(_findUserServicesjs);
var _jwtjs = require('../middlewares/jwt.js'); var _jwtjs2 = _interopRequireDefault(_jwtjs);

const routes = _express2.default.Router();
routes.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const { user } = await _findUserServicesjs2.default.userFind(id);
        console.log('usuário:', user);
        if (user) {
            response.status(200).send({ user });
        } else {
            response.status(404).send({ message: "usúario não encontrado" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Erro na requisição" });
    }
});


exports. default = routes;
