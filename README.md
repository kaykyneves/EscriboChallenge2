# EscriboChallenge2

VOCÊ DEVE TER O NODE INSTALADO
Instale essas dependências

node_modules = npm install
express = npm install express
bcrypt = npm install bcrypt
jwt = npm install jsonwebtoken

CRIE UMA DATABASE NO MYSQL CHAMADA 'escribo', E COLE O CÓDIGO QUE ESTÁ NA FILE 'script.sql' dentro da pasta Repository, se necessário mude a porta o servidor para a sua de uso, você pode mudar isso no arquivo 'connection.js' da pasta repository, e configurar suas informações do banco.

PARA ENVIAR A REQUISIÇÃO PARA CADASTRO DE USUÁRIO, USE A ROTA: http://localhost:3333/signUp

Envie a requisição em formato JSON no método HTTP 'POST':

{
 "nome" : "anymail",
 "email" : "teste@gmail.com",
 "senha" : "Hesoyam20@",
 "telefones" : [{"telefone": 12345678, "ddd":11}]
}

PARA ENVIAR A REQUISIÇÃO DE LOGIN, USE A ROTA: http://localhost:3333/signIn

Envie a requisição em formato JSON no método HTTP 'POST':

{
 "email" : "teste@gmail.com",
 "senha" : "Hesoyam205@"
}


PARA ENVIAR A REQUISIÇÃO DE BUSCAR USUÁRIO, USE A ROTA: http://localhost:3333/findUser

Envie a requisição em formato JSON no método HTTP 'GET':

Passe o ID do usuário que você quer buscar pela url: http://localhost:3333/findUser/id

ex: http://localhost:3333/findUser/1 (vai buscar o usúario com o id 1)

PARA CONSEGUIR BUSCAR O USUARIO, VOCÊ TERÁ QUE VALIDAR O TOKEN JWT RECEBIDO NO LOGIN OU CADASTRO:

Coloque o AUTH TYPE (Estou utilizando o INSOMNIA), no formato BEARER e passe o token JWT recebido, se o token for válido, irá buscar as informações do usúario desejado.


