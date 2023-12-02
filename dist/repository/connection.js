"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _promise = require('mysql2/promise'); var _promise2 = _interopRequireDefault(_promise);

async function connect() {
    const connection = await _promise2.default.createConnection({
        host: 'bftv7ounevqtknuwfjdf-mysql.services.clever-cloud.com',
        port: 3306,
        user: 'utvwatelhpryloln',
        password: '54DlkkRuVmkBmlbsG4ap',
        database: 'bftv7ounevqtknuwfjdf',
    });

    return connection;
}

exports. default = {connect};