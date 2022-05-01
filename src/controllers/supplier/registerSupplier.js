const connection = require('../../connection');
const bcrypt = require('bcrypt');

const registerSupplier = async (req, res) => {
  const {
    nome,
    email,
    senha,
    segmento,
    cnpj,
    telefone,
    endereco
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
    const queryCheckEmail = "select * from supplier where email = $1";
    const {
      rowCount: totalSupplier
    } = await connection.query(queryCheckEmail, [email]);

    if (totalSupplier > 0) {
      return res.status(400).json({
        "mensagem": "Já existe um fornecedor cadastrado com o e-mail informado."
      });
    }

    const encryptedPassword = await bcrypt.hash(senha, 10);

    const queryRegister = "insert into supplier (nome, email, senha, segmento, cnpj, telefone, endereco) values ($1, $2, $3, $4, $5, $6, $7)";
    const registredSupplier = await connection.query(queryRegister, [nome, email, encryptedPassword, segmento, cnpj, telefone, endereco]);

    if (registredSupplier.rowCount === 0) {
      return res.status(400).json({
        "mensagem": "Não foi possível cadastrar o fornecedor"
      });
    }

    return res.status(200).json({
      "mensagem": "Fornecedor cadastrado com sucesso"
    });

  } catch (error) {
    return res.status(400).json(error);
  }
}

module.exports = {
  registerSupplier
}