import mysql2 from 'mysql2/promise';

async function connect() {
    const connection = await mysql2.createConnection({
        host: 'bftv7ounevqtknuwfjdf-mysql.services.clever-cloud.com',
        port: 3306,
        user: 'utvwatelhpryloln',
        password: '54DlkkRuVmkBmlbsG4ap',
        database: 'bftv7ounevqtknuwfjdf',
    });

    return connection;
}

export default {connect};