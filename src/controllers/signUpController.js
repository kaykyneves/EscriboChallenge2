//Importando as dependências
import express, { request, response } from 'express';
import db from '../services/signUpServices.js';
import bcrypt from '../helpers/bcryptHelper.js';
import jwt from '../middlewares/jwt.js';

//chamando a rota
const routes = express.Router();

//utilizando as funções da rota para cadastrar o novo usúario
routes.post('/', async (request, response) => {
    try{
        //pegando as informações do corpo da requisição
        const{nome, email, senha, telefones} = request.body;

        //encriptando a senha
        const criptoSenha = await bcrypt.criptoPassword(senha);

        //extraindo as informações da variável 'telefones', que veio como array e inserindo dentro da variável 'phones'
        const phones = telefones.map(phone => {
            return {
                telefone: phone.telefone,
                
                ddd: phone.ddd
            };
          
        });
        //gerando o token jwt
        const tokenUser = { nome: nome, email: email };

        //definindo que o token terá 30 minutos de duração
        const token = jwt.sign(tokenUser, 60 * 30);

        //definindo as variáveis que vem do createUser e passando as varíaveis para a service
        const {message, designCheck} = await db.createUser(nome, email, criptoSenha, phones);

        //inserindo a varíavel token junto com as informações do design Check, que cria a formatação JSON para  exibir na response
        const newDesign = {...designCheck, token}

        //se a 'message' que vier da service for igual a 0, significa que o email já existe na base de dados
        if (message === 0) {
            response.status(401).send({message: "E-mail já existente!"})
        }
        //se não for, ele cadastra o novo usúario e envia o newDesign
        else {
            response.status(201).send({newDesign})
        }
    }

    catch (error) {
        response.status(500).send(`Erro na requisição! ${error}`);
    }
});

export default routes;
