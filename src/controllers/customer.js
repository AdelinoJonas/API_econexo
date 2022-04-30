const connection = require('../connection');
const bcrypt = require('bcrypt');

const registerCustomer = async (req, res) => {
    const {
        nome,
        email,
        senha
    } = req.body;

    if (!nome) {
        return res.status(400).json({
            "mensagem": "O campo nome é obrigatório"
        });
    }
    if (!email) {
        return res.status(400).json({
            "mensagem": "O campo email é obrigatório"
        });
    }
    if (!senha) {
        return res.status(400).json({
            "mensagem": "O campo senha é obrigatório"
        });
    }

    try {
        const queryCheckEmail = "select * from customer where email = $1";
        const {
            rowCount: totalCustomers
        } = await connection.query(queryCheckEmail, [email]);

        if (totalCustomers > 0) {
            return res.status(400).json({
                "mensagem": "Já existe usuário cadastrado com o e-mail informado."
            });
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const queryRegister = "insert into customer (nome, email, senha) values ($1, $2, $3)";
        const registredCustomer = await connection.query(queryRegister, [nome, email, encryptedPassword]);

        if (registredCustomer.rowCount === 0) {
            return res.status(400).json({
                "mensagem": "Não foi possível cadastrar o cliente"
            });
        }

        return res.status(200).json({
            "mensagem": "Cliente cadastrado com sucesso"
        });
        
    } catch (error) {
        return res.status(400).json(error);
    }
}

module.exports = {
    registerCustomer
}