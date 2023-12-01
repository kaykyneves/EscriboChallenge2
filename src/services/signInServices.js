import banco from '../repository/connection.js';


async function login(email, senha){

    const sql = "CALL validity_user(?, ?, @query_result, @query_password, @method)";

    const dataLogin = [email, senha];
    const conn = await banco.connect();
    const [row] = await conn.query(sql, dataLogin);
    const [rows] = await conn.query('SELECT @method AS message, @query_result AS query_result, @query_password as query_password');
    conn.end();

    const message = rows[0].message;
    
    let query_result = rows[0].query_result;
    let query_password = rows[0].query_password;
    if (query_result === null) {
        return { message, query_password };
}else{
    query_result = JSON.parse(query_result);

    const designCheck = {
        id: query_result.id,
        data_criacao: query_result.data_criacao,
        data_atualizacao: query_result.data_atualizacao,
        ultimo_login: query_result.ultimo_login,
    };

    return { message, designCheck, query_password};
}}


export default {login};