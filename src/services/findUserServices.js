import banco from '../repository/connection.js';

async function userFind(id) {
  try {
    const sql = 'SELECT * FROM users WHERE id = ?';
    const findUser = [id];

    const conn = await banco.connect();
    const [row] = await conn.query(sql, findUser);
    conn.end();

    console.log('Resultado do banco:', row);

    if (row.length > 0) {
      const user = row[0]; 
      return { user };
    } else {
      return { message: "usúario inválido" };
    }
  } catch (error) {
    console.error('Erro no serviço db.token:', error);
  }
}

export default {userFind};

