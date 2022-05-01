const connection = require('../connection');
const jwt = require("jsonwebtoken");
const jwt_Secret = require("../jwt_secrets");

const auth = async (req, res, next) => {
    const {
        authorization
    } = req.headers;

    if (!authorization) {
        res.status(404).json({ "mensagem": "token não informado." });
    }
    try {
        const token = authorization.replace('Bearer', '').trim();
        const {
            id
        } = jwt.verify(token, jwt_Secret);

        const queryAuthentication = 'select * from supplier where id = $1';
        const authorizedUser = await connection.query(queryAuthentication, [id]);

        if (authorizedUser.rowCount === 0) {
            req.status(404).json('Fornecedor não encontrado.');
        }

        //SEPARANDO SENHA DO CONTEUDO DO USUARIO
        const {
            password,
            ...user
        } = authorizedUser.rows[0];

        req.user = user;

        next();
    } catch (error) {
        res.status(400).json(error.message);
    }
}

module.exports = auth;