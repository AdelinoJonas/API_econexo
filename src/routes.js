const express = require('express');
const customer = require('./controllers/customer/registerCustomer');
const loginCustomer = require('./controllers/customer/loginCustomer');
const getCustomer = require('./controllers/customer/getCustomer');
const authCustomer = require('./filtros/authCustomer');

const routes = express();

routes.post('/loginCustomer', loginCustomer.login);
routes.use(authCustomer);

routes.post('/cadastrarCustomer', customer.registerCustomer);
routes.get('/obterCustomer', getCustomer.getCustomer);

module.exports = routes;