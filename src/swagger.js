const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Leilão API',
            version: '1.0.0',
            description: 'API para gerenciamento de usuários e leilões'
        },
    },
    // O Swagger vai procurar os comentários JSDoc dentro do app.js
    apis: ['./src/app.js'], 
};

module.exports = swaggerJsdoc(options);