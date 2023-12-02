"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _promise = require('mysql2/promise'); var _promise2 = _interopRequireDefault(_promise);

async function connect() {
    const connection = await _promise2.default.createConnection({
        host: 'localhost',
        port: 3307,
        user: 'root',
        password: '',
        database: 'escribo',
    });

    return connection;
}

exports. default = {connect};