//importo as dependências
import express from 'express';
import db from '../services/findUserServices.js';

//chamando a rota
const routes = express.Router();

//utilizando as funções da rota para listar o usúario, passando o 'ID' pela rota 
routes.get('/:id', async (request, response) => {
    try {

        //requisitando o id
        const { id } = request.params;

        //definindo a variável que vem do 'userFind' e passando a varíavel 'id' para a service
        const { user } = await db.userFind(id);

        //se a service retornar o 'user', o usuário recebera o status (200) com as informações do usuário solicitado
        if (user) {
            response.status(200).send({ user });
        } 
        
        //se não vier, significa que não existe nenhum usúario cadastrado com o 'id' inserido pelo usúario, e ele receberá o status (404)
        else {
            response.status(404).send({ message: "usúario não encontrado" });
        }
    } catch (error) {
        response.status(500).send({ message: "Erro na requisição" });
    }
});


export default routes;
