
 
<body>

  <h1>EscriboChallenge2</h1>
  
  <h2>Rotas</h2>

  <li>Quando fizer a requisição pela primeira vez, por favor tente por um tempo, pois o servidor demora um pouco para responder</li>
  
  <h3>Cadastro de Usuário</h3>
  <ul>
    <li><strong>Rota:</strong> <a href="https://escribochallengee.onrender.com/signUp">https://escribochallengee.onrender.com/signUp</a></li>
    <li><strong>Método HTTP:</strong> POST</li>
    <li><strong>Exemplo de Requisição JSON:</strong></li>
  </ul>
  <code>
    {
      "nome": "anymail",
      "email": "teste@gmail.com",
      "senha": "Hesoyam20@",
      "telefones": [{"telefone": 12345678, "ddd": 11}]
    }
  </code>
  <h3>Login</h3>
  <ul>
    <li><strong>Rota:</strong> <a href="https://escribochallengee.onrender.com/signIn">https://escribochallengee.onrender.com/signIn</a></li>
    <li><strong>Método HTTP:</strong> POST</li>
    <li><strong>Exemplo de Requisição JSON:</strong></li>
  </ul>
  <code>
    {
      "email": "teste@gmail.com",
      "senha": "Hesoyam205@"
    }
  </code>
  <h3>Buscar Usuário</h3>
  <ul>
    <li><strong>Rota:</strong> <a href="https://escribochallengee.onrender.com/findUser/id">https://escribochallengee.onrender.com/findUser/id</a></li>
    <li><strong>Método HTTP:</strong> GET</li>
    <li><strong>Exemplo de Requisição JSON:</strong></li>
  </ul>
  <p>Passe o ID do usuário desejado na URL, por exemplo:</p>
  <code>
    https://escribochallengee.onrender.com/findUser/1 (buscará o usuário com ID 1)
  </code>
  <h3>Validar Token JWT</h3>
  <ul>
    <li>Para buscar um usuário, você deve validar o token JWT recebido durante o login ou cadastro.</li>
    <li>Configure o Auth Type (exemplo com INSOMNIA) como BEARER e forneça o token JWT recebido. Se o token for válido, as informações do usuário serão retornadas.</li>
 <h1> Se for testar a api localmente:</h1>   
<h2>Pré-requisitos</h2>
  <ul>
    <li>Node.js deve estar instalado.</li>
  </ul>
  <h2>Instalação de Dependências</h2>
  <p>Para instalar as dependências, execute o seguinte comando no terminal:</p>
  <code>
    npm install<br>
    npm install express<br>
    npm install bcrypt<br>
    npm install jsonwebtoken
  </code>
  <h2>Iniciar o projeto:</h2>
  <code>
   npm start
  </code>
  <h2>Configuração do Banco de Dados MySQL</h2>
  <ol>
    <li>Crie uma base de dados no MySQL.</li>
    <li>Execute o código fornecido no arquivo 'script.sql' na pasta Repository para configurar as tabelas.</li>
    <li>
      <h3>Configuração do Servidor</h3>
      <ul>
        <li>Se necessário, altere a porta do servidor no arquivo 'connection.js' na pasta repository.</li>
        <li>Configure as informações do banco de dados no mesmo arquivo.</li>
      </ul>
    </li>
    <h2> Rotas Locais</h2>
     <h3>Cadastro de Usuário</h3>
  <ul>
    <li><strong>Rota:</strong> <a http://localhost:3333/signUp">http://localhost:3333/signUp</a></li>
    <li><strong>Método HTTP:</strong> POST</li>
    <li>Use o mesmo exemplo demonstrado na primeira rota de cadastro</li>
  </ul>
    <h3>Login</h3>
  <ul>
    <li><strong>Rota:</strong> <a http://localhost:3333/signIn">http://localhost:3333/signIn</a></li>
    <li><strong>Método HTTP:</strong> POST</li>
    <li>Use o mesmo exemplo demonstrado na primeira rota de login</li>
  </ul>
    <h3>Buscar usuário</h3>
  <ul>
    <li><strong>Rota:</strong> <a http://localhost:3333/findUser">http://localhost:3333/findUser</a></li>
    <li><strong>Método HTTP:</strong> GET</li>
    <li>Use o mesmo exemplo demonstrado na primeira rota de buscar usuário</li>
  </ul>
   <p>Passe o ID do usuário desejado na URL, por exemplo:</p>
  <code>
    http://localhost:3333/findUser/1 (buscará o usuário com ID 1)
  </code>
  <h3>Validar Token JWT</h3>
  <ul>
    <li>Para buscar um usuário, você deve validar o token JWT recebido durante o login ou cadastro.</li>
    <li>Configure o Auth Type (exemplo com INSOMNIA) como BEARER e forneça o token JWT recebido. Se o token for válido, as informações do usuário serão retornadas.</li>
  </ol>
    
