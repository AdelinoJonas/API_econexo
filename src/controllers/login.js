const connection = require('../connection');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const jwt_Secret = require("../jwt_secrets");

const login = async (req, res) => {
  const {
    email,
    senha
  } = req.body;

  if (!email || !senha) {
    return res.status(400).json('O campo email e senha são obrigatórios.');
  }

  try {
    const queryCheckEmail = 'select * from customer where email = $1';
    const {
      rows,
      rowCount
    } = await connection.query(queryCheckEmail, [email]);

    if (rowCount === 0) {
      return res.status(404).json('Cliente não encontrado.');
    }
    const customer = rows[0];

    const checkedPassword = await bcrypt.compare(senha, customer.senha);

    if (!checkedPassword) {
      return res.status(400).json('e-mail e/ou senha inválido(s).');
    }

    const token = jwt.sign({
      id: customer.id
    }, jwt_Secret);
    console.log(token);
    return res.status(200).json(token);
  } catch (error) {
    return res.status(400).json(error.message);
  }
}