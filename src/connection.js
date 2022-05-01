const { Pool } = require("pg");
//const dotenv = require('dotenv'); - Apenas local (testes)

//dotenv.config(); - Apenas local (testes)

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "api_econexo_db",
  password: "123456",
  port: 5432,
});

const query = (text, param) => {
  return pool.query(text, param);
};

module.exports = {
  query,
  pool,
};
