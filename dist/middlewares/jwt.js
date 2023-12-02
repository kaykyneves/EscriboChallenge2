"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const secretKey = '3Y#vF&6aBpL9!zXs@8WqR4n';

const sign = (payload, expiresIn = '1h') => {
  return _jsonwebtoken2.default.sign(payload, secretKey, { expiresIn });
};

 const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }

  try {
    const decoded = _jsonwebtoken2.default.verify(token.split(' ')[1], secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ mensagem: 'Sessão inválida' });
    }
    return res.status(401).json({ mensagem: 'Não autorizado' });
  }
}; exports.verifyToken = verifyToken;

exports. default = {  sign };

