import express from 'express';
import db from '../services/findUserServices.js';
import jwt from '../middlewares/jwt.js';

const routes = express.Router();
routes.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const { user } = await db.userFind(id);
        console.log('usuário:', user);
        if (user) {
            response.status(200).send({ user });
        } else {
            response.status(404).send({ message: "usúario não encontrado" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Erro na requisição" });
    }
});


export default routes;
