import express, { request, response } from 'express';
import db from '../services/signUpServices.js';
import bcrypt from '../helpers/bcryptHelper.js';
const routes = express.Router();

routes.post('/', async (request, response) => {
    try {
        const { email, senha } = request.body;

        const { message, designCheck, query_password } = await db.login(email, senha);
        if (message === 0) {
            response.status(401).send({ message: "Usuário e/ou senha inválidos" });
        } else {

            const verifySenha = await bcrypt.passwordCheck(senha, query_password);
     
            if (!verifySenha) {
                response.status(401).send('usuario e/ou senha inválidos!');
                return;
            }

            const token = jwt.sign(tokenUser, 60 * 30);

            const newDesign = {...designCheck, token}


            response.status(200).send({ designCheck });
        }
    } catch (error) {
        response.status(500).send(`Houve algum erro no banco de dados ${error}`);
    }
});

export default routes;
