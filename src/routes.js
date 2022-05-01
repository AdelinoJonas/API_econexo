const express = require("express");
const customer = require("./controllers/customer");
const product = require("./controllers/product");

const routes = express();

routes.post("/cadastrarCliente", customer.registerCustomer);
routes.post("/cadastrarProduto", product.createProduct);

module.exports = routes;
