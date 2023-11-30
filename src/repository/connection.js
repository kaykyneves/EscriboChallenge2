import mysql2 from 'mysql2/promise';

async function connect() {
    const connection = await mysql2.createConnection({
        host: 'localhost',
        port: 3307,
        user: 'root',
        password: '',
        database: 'escribo',
    });

    return connection;
}

export default {connect};