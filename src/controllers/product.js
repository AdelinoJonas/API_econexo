const connection = require("../connection");

exports.createProduct = async (req, res) => {
  const { product_name, quantity, price } = req.body;
  const { rows } = await db.query(
    "INSERT INTO products (productname, productdescription, quantity, price) VALUES ($1, $2, $3,$4)",
    [product_name, product_description, quantity, price]
  );

  res.status(201).send({
    message: "Product added successfully!",
    body: {
      product: { product_name, quantity, price },
    },
  });
};
