"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _connectionjs = require('../repository/connection.js'); var _connectionjs2 = _interopRequireDefault(_connectionjs);

async function createEmployee(nome, email, senha, telefones, token) {
    const sql = "CALL cadastrar_usuario (?,?,?,?,?, @method, @query_result)";

    const conn = await _connectionjs2.default.connect();

    for (const phone of telefones) {
        const values = [nome, email, senha, phone.telefone, phone.ddd];
        await conn.query(sql, values);
    }

    const [rows] = await conn.query('SELECT @method AS message, @query_result AS query_result');
    conn.end();

    const message = rows[0].message;
    let query_result = rows[0].query_result;
    
    if (query_result === null) {
        return { message};
}else{
    query_result = JSON.parse(query_result);

    const designCheck = {
        id: query_result.id,
        data_criacao: query_result.data_criacao,
        data_atualizacao: query_result.data_atualizacao,
        ultimo_login: query_result.ultimo_login,
    };

    return { message, designCheck };
}}

    exports. default = {createEmployee};