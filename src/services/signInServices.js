import banco from '../repository/connection.js';

//criando a função 'login' e passando os parâmetros que vem da controller 
async function login(email){

    //chamando a procedure que valida o usúario
    const sql = "CALL validity_user(?, @query_result, @query_password, @method)";

    const dataLogin = [email];
    const conn = await banco.connect();
    const [row] = await conn.query(sql, dataLogin);

    //abstraindo as inforações que vem do banco pelas variáveis da PROCEDURE
    const [rows] = await conn.query('SELECT @method AS message, @query_result AS query_result, @query_password as query_password');
    conn.end();

    //jogo as informações dentro de variáveis para poder utilizá-las
    const message = rows[0].message;
    let query_result = rows[0].query_result;
    let query_password = rows[0].query_password;

    //se a query_result vem vazia, significa que o email não existe na base de dados e caiu no primeiro 'IF',que faz essa validação, e seta a message como FALSE (0) 
    if (query_result === null) {
        return { message };
}
    //se a query_result não estiver, significa que o email existe na base de dados, e o usuário pode partir pra etapa de validação da senha. Eu pego o query_result e transformo ele em JSON, depois crio a variável 'designCheck', e formo o OUTPUT da requisição, como foi solicitado
    else{
        query_result = JSON.parse(query_result);

        const designCheck = {
            id: query_result.id,
            data_criacao: query_result.data_criacao,
            data_atualizacao: query_result.data_atualizacao,
            ultimo_login: query_result.ultimo_login,
        };
        //retorno os dados 
        return { message, designCheck, query_password};
    }}

//exporto a função
export default {login};