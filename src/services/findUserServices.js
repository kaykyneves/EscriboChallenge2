import banco from '../repository/connection.js';

async function token(token) {
  try {
    const sql = 'SELECT token FROM changes_user WHERE token = ?';
    const findUser = [token];

    const conn = await banco.connect();
    const [row] = await conn.query(sql, findUser);
    conn.end();

    console.log('Resultado do banco:', row);

    if (row.length > 0) {
      const convToken = row[0].token; 
      return { convToken };
    } else {
      return { message: "Token inválido" };
    }
  } catch (error) {
    console.error('Erro no serviço db.token:', error);
  }
}

export default {token};

