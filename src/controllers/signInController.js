import express, { request, response } from 'express';
import db from '../services/signInServices.js';
import bcrypt from '../helpers/bcryptHelper.js';
import jwt from '../middlewares/jwt.js';
const routes = express.Router();

routes.post('/', async (request, response) => {
    try {
        const { email, senha } = request.body;

        const { message, designCheck, query_password } = await db.login(email, senha);
        const tokenUser = { email: email, senha: senha };
        const token = jwt.sign(tokenUser, 60 * 30);

        const newDesign = {...designCheck, token}
        if (message === 0) {
            response.status(401).send({ message: "Usuário e/ou senha inválidos" });
        } else {

            const verifySenha = await bcrypt.passwordCheck(senha, query_password);
     
            if (!verifySenha) {
                response.status(401).send({message: "Usuário e/ou senha inválidos"});
                return;
            }

            response.status(200).send({ newDesign });
        }
    } catch (error) {
        response.status(500).send(`Houve algum erro no banco de dados ${error}`);
    }
});

export default routes;
