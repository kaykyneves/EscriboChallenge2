import express, { request, response } from 'express';
import db from '../services/signUpServices.js';
import bcrypt from '../helpers/bcryptHelper.js';
import jwt from '../middlewares/jwt.js';
const routes = express.Router();
routes.post('/', async (request, response) => {
    try{
        const{nome, email, senha, telefones} = request.body;

        const criptoSenha = await bcrypt.criptoPassword(senha);
        const phones = telefones.map(phone => {
            return {
                telefone: phone.telefone,
                
                ddd: phone.ddd
            };
          
        });

        const tokenUser = { nome: nome, email: email };

        

        const token = jwt.sign(tokenUser, 60 * 30);
        const {message, designCheck} = await db.createEmployee(nome, email, criptoSenha, phones);
        const newDesign = {...designCheck, token}

        if (message === 0) {
            response.status(401).send({message: "E-mail já existente!"})
        }

        else {
            response.status(201).send({newDesign})
        }
    }

    catch (error) {
        response.status(500).send(`Erro na requisição! ${error}`);
    }
});

export default routes;
