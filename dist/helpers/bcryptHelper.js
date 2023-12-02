"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _bcrypt = require('bcrypt'); var _bcrypt2 = _interopRequireDefault(_bcrypt);

async function criptoPassword(password) {
    const saltRounds = 10;
    const passwordCript = await _bcrypt2.default.hash(password, saltRounds);
    return passwordCript;
}

async function passwordCheck(password, passwordCript) {
    console.log('Comparando senhas:');
    console.log('Senha:', password);
    console.log('Senha Criptografada:', passwordCript);
    const criptos = await _bcrypt2.default.compare(password, passwordCript);
    console.log('Resultado da comparação:', criptos);
    return criptos;
}


exports. default = {
    criptoPassword,
    passwordCheck
};
