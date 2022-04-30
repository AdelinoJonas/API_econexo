const express = require('express');
const customer = require('./controllers/customer/registerCustomer');

const routes = express();

routes.post('/cadastrarCliente', customer.registerCustomer);

module.exports = routes;