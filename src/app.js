/*const { addUser, getUserById } = require('./user');
const { createAuction, getAuctionById, placeBid, getBidsForAuction } = require('./auction');


(async () => {
    await addUser({ id: 1, name: 'Alice' });
    await addUser({ id: 2, name: 'Bob' });


    await createAuction({ id: 1, name: 'Leilão de arte', startingPrice: 100 });


    await placeBid(1, 2, 120); // Bob (id: 2) dá um lance de 120 no leilão (id: 1)


    const user = await getUserById(2);
    const auction = await getAuctionById(1);
    const bids = await getBidsForAuction(1);


    console.log('Usuário:', user);
    console.log('Leilão:', auction);
    console.log('Lances:', bids);

    
})();*/


const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();
app.use(express.json());

// Rota para acessar a documentação gerada
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID auto-gerado do usuário
 *         name:
 *           type: string
 *           description: Nome completo do usuário
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Retorna a lista de todos os usuários
 *     responses:
 *       '200':
 *         description: Lista de usuários obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
app.get('/users', (req, res) => {
    // Exemplo estático: aqui você chamaria o db.all()
    res.status(200).json([{ id: 1, name: 'João' }, { id: 2, name: 'Maria' }]);
});

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Busca um usuário específico pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do usuário
 *     responses:
 *       '200':
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: Usuário não encontrado
 */
app.get('/users/:id', (req, res) => {
    res.status(200).json({ id: req.params.id, name: 'João' });
});

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Adiciona um novo usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Usuário criado com sucesso
 */
app.post('/users', (req, res) => {
    res.status(201).json({ id: 3, name: req.body.name });
});

/**
 * @openapi
 * /users/{id}:
 *   put:
 *     summary: Atualiza os dados de um usuário existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Usuário atualizado com sucesso
 */
app.put('/users/:id', (req, res) => {
    res.status(200).json({ id: req.params.id, name: req.body.name });
});

/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Remove um usuário do sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do usuário a ser removido
 *     responses:
 *       '204':
 *         description: Usuário removido com sucesso (Sem conteúdo)
 */
app.delete('/users/:id', (req, res) => {
    res.status(204).send();
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
    console.log('Documentação disponível em http://localhost:3000/api-docs');
});