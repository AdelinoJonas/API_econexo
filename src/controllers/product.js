const connection = require("../connection");
const bcrypt = require("bcrypt");

// ==> Método responsável por criar um novo 'Product':
exports.createProduct = async (req, res) => {
  const { product_name, product_description, quantity, price } = req.body;
  const response = await connection.query(
    "INSERT INTO products (product_name, product_description, quantity, price) VALUES ($1, $2, $3,$4)",
    [product_name, product_description, quantity, price]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { product_name, product_description, quantity, price },
    },
  });
};

// ==> Método responsável por listar todos os 'Products':
exports.listAllProducts = async (req, res) => {
  const response = await connection.query(
    "SELECT * FROM products ORDER BY product_name ASC"
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por selecionar 'Product' pelo 'Id':
exports.findProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const response = await connection.query(
    "SELECT * FROM products WHERE productid = $1",
    [productId]
  );
  res.status(200).send(response.rows);
};

// ==> Método responsável por atualizar um 'Product' pelo 'Id':
exports.updateProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  const { product_name, product_description, quantity, price } = req.body;

  const response = await connection.query(
    "UPDATE products SET product_name = $1, quantity = $2, price = $3 WHERE productId = $4",
    [product_name, product_description, quantity, price, productId]
  );

  res.status(200).send({ message: "Product Updated Successfully!" });
};

// ==> Método responsável por excluir um 'Product' pelo 'Id':
exports.deleteProductById = async (req, res) => {
  const productId = parseInt(req.params.id);
  await connection.query("DELETE FROM products WHERE productId = $1", [
    productId,
  ]);

  res.status(200).send({ message: "Product deleted successfully!", productId });
};
