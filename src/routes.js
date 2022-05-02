const express = require('express');
const customer = require('./controllers/customer/registerCustomer');
const loginCustomer = require('./controllers/customer/loginCustomer');
const getCustomer = require('./controllers/customer/getCustomer');
const authCustomer = require('./filters/authCustomer');
const supplier = require('./controllers/supplier/registerSupplier');
const getSupplier = require('./controllers/supplier/getSupplier');
const loginSupplier = require('./controllers/supplier/loginSupplier');
const authSupplier = require('./filters/authSupplier');

const routes = express();

routes.post('/customer/login', loginCustomer.login);
routes.post('/customer', customer.registerCustomer);
routes.get('/customer', authCustomer, getCustomer.getCustomer);

routes.post('/supplier/login', loginSupplier.login);
routes.post('/supplier', supplier.registerSupplier);
routes.get('/supplier', authSupplier, getSupplier.getSupplier);

routes.post("/cadastrarProduto", product.createProduct);
routes.post("/products", product.createProduct);
routes.get("/products", product.listAllProducts);
routes.get("/products/:id", product.findProductById);
routes.put("/products/:id", product.updateProductById);
routes.delete("/products/:id", product.deleteProductById);
routes.get("/products/:id", product.listProductsByCategory);

module.exports = routes;
