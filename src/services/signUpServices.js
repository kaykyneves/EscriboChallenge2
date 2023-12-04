import banco from '../repository/connection.js';

//criando a função 'createUser' e passando os parâmetros que vem da controller 
async function createUser(nome, email, senha, telefones) {

    //chamando a procedure que cadastra o usúario
    const sql = "CALL cadastrar_usuario (?,?,?,?, ?, @method, @query_result)";

    const conn = await banco.connect();

    //pegando a varIável phone e iterando encima dela para cadastrar o 'telefone' e o 'DDD'
    for (const phone of telefones) {
        const values = [nome, email, senha, phone.telefone, phone.ddd];
        await conn.query(sql, values);
    }
    //abstraindo as inforações que vem do banco pelas variáveis da PROCEDURE
    const [rows] = await conn.query('SELECT @method AS message, @query_result AS query_result');
    conn.end();

    //jogo as informações dentro de variáveis para poder utilizá-las
    const message = rows[0].message;
    let query_result = rows[0].query_result;

    //se a query_result vem vazia, significa que o email já existe na base de dados e caiu no primeiro 'IF',que faz essa validação, e seta a message como FALSE (0) 
    if (query_result === null) {
        return { message};
}
    //se a query_result não estiver, significa que o email não existe na base de dados, e o usuário foi cadastrado, eu pego o query_result e transformo ele em JSON, depois crio a variaável 'designCheck', e formo o OUTPUT da requisição, como foi solicitado
    else{
        query_result = JSON.parse(query_result);

        const designCheck = {
            id: query_result.id,
            data_criacao: query_result.data_criacao,
            data_atualizacao: query_result.data_atualizacao,
            ultimo_login: query_result.ultimo_login,
        };
    //retorno os dados 
    return { message, designCheck };
}}
//exporto a função
export default {createUser};