import banco from '../repository/connection.js';

async function createEmployee(nome, email, senha, telefones, token) {
    const sql = "CALL cadastrar_usuario (?,?,?,?,?, ?, @method, @query_result)";

    const conn = await banco.connect();

    for (const phone of telefones) {
        const values = [nome, email, senha, phone.telefone, phone.ddd, token];
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
        token: query_result.token
    };

    return { message, designCheck };
}}

    export default {createEmployee};