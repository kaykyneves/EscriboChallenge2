import express from 'express';
import db from '../services/findUserServices.js';
import jwt from '../middlewares/jwt.js';

const routes = express.Router();
routes.post('/', async (request, response) => {
    try {
        // Agora você acessa o token pelo corpo da requisição (request.body)
        const { token } = request.body;

        // Chame o serviço para verificar o token
        const { convToken } = await db.token(token);
        console.log('convToken:', convToken); // Verifique se convToken está presente
        if (convToken) {
            // Se houver um tokenValue na resposta, significa que a consulta foi bem-sucedida
            response.status(200).send({ convToken });
        } else {
            // Se não houver tokenValue, você pode lidar com isso de acordo com sua lógica
            response.status(404).send({ message: "Token não encontrado" });
        }
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: "Erro na requisição" });
    }
});


export default routes;
