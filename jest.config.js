 const testEnvironment = 'node';
const testMatch = [
    '**/__tests__/**/*.js',
    '**/*.test.js',
    '**/*.spec.js', // Procura arquivos que terminam com .spec.js
];

export default {testEnvironment, testMatch}