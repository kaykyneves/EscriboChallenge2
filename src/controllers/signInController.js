//importo as dependências
import express, { request, response } from 'express';
import db from '../services/signInServices.js';
import bcrypt from '../helpers/bcryptHelper.js';
import jwt from '../middlewares/jwt.js';

//chamando a rota
const routes = express.Router();

//utilizando as funções da rota para logar o usúario
routes.post('/', async (request, response) => {
    try {

        //pegando as informações do corpo da requisição
        const { email, senha } = request.body;

        //definindo as variáveis que vem do 'login' e passando as varíaveis para a service
        const { message, designCheck, query_password } = await db.login(email);

        //gerando um novo token de sessão
        const tokenUser = { email: email, senha: senha };
        const token = jwt.sign(tokenUser, 60 * 30);

        //atribuindo o token para s outras variáveis do 'designCheck'
        const newDesign = {...designCheck, token};

        //se a resposta do banco de dados for 0 para variável 'message', então o usuário receberá o status (401); 
        if (message === 0) {
            response.status(401).send({ message: "Usuário e/ou senha inválidos" });
        } 

        // se não for, então significa que o email existe, e vamos verificar a senha para validar o usuário
        else {

            //chamando a função 'verifySenha' do 'bcrypt', e passando a variável 'senha' que vem do body, e a variável 'query_password' que vem do encriptada do banco de dados
            const verifySenha = await bcrypt.passwordCheck(senha, query_password);
     
            //se a função verifySenha for inválida, ou seja, as senhas não coincidirem, o usuário receberá o status (401), e encerrará
            if (!verifySenha) {
                response.status(401).send({message: "Usuário e/ou senha inválidos"});
                return;
            }
            //se a senha for validada o usuário receberá a o status (200) e o newDesign com as informações requisitadas

            response.status(200).send({ newDesign });
        }
    } catch (error) {
        response.status(500).send(`Houve algum erro no banco de dados ${error}`);
    }
});

export default routes;
