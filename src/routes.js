const express = require('express');
const custumer = require('./controllers/custumer');
const authentication = require('./controllers/auth');

const rotas = express();

//LOGIN
rotas.post('/login', custumer.login);

//custumer
rotas.post('/cadastrar', custumer.registerCustumer);
// rotas.put('/custumer/:id', custumer.obterUsuario);
rotas.use(authentication);

module.exports = rotas;