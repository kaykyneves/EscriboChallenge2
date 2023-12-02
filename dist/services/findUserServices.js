"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connectionjs = require('../repository/connection.js'); var _connectionjs2 = _interopRequireDefault(_connectionjs);

async function userFind(id) {
  try {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const findUser = [id];

    const conn = await _connectionjs2.default.connect();
    const [row] = await conn.query(sql, findUser);
    conn.end();

    console.log('Resultado do banco:', row);

    if (row.length > 0) {
      const user = row[0]; 
      return { user };
    } else {
      return { message: "usúario inválido" };
    }
  } catch (error) {
    console.error('Erro no serviço db.token:', error);
  }
}

exports. default = {userFind};

