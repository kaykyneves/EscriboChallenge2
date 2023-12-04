import banco from '../repository/connection.js';

//criando a função 'userFind' e passando os parâmetros que vem da controller 
async function userFind(id) {

  //fazendo um SELECT simples passando o 'id'
  try {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const findUser = [id];

    const conn = await banco.connect();
    const [row] = await conn.query(sql, findUser);
    conn.end();

    //se o 'row.length > 0' significa que a consulta recebeu dados
    if (row.length > 0) {

      //aloco o valor na variável 'user'
      const user = row[0]; 

      //retorno a variável
      return { user };
    } 
    //retorno uma mensagem padrãp
    else {
      return { message: "usúario inválido" };
    }
  } catch (error) {
    console.error('Erro no serviço ', error);
  }
}

export default {userFind};

