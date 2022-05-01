const express = require("express");
const customer = require("./controllers/customer");
const product = require("./controllers/product");

const routes = express();

routes.post("/cadastrarCliente", customer.registerCustomer);
// ==> Definindo as rotas do CRUD - 'Product':

// ==> Rota responsável por criar um novo 'Product': (POST): localhost:3000/api/products
routes.post("/products", product.createProduct);

// ==> Rota responsável por listar todos os 'Products': (GET): localhost:3000/api/products
routes.get("/products", product.listAllProducts);

// ==> Rota responsável por selecionar 'Product' pelo 'Id': (GET): localhost:3000/api/products/:id
routes.get("/products/:id", product.findProductById);

// ==> Rota responsável por atualizar 'Product' pelo 'Id': (PUT): localhost: 3000/api/products/:id
routes.put("/products/:id", product.updateProductById);

// ==> Rota responsável por excluir 'Product' pelo 'Id': (DELETE): localhost:3000/api/products/:id
routes.delete("/products/:id", product.deleteProductById);

// ==> Rota responsável por listar todos os 'Products' por categoria:
routes.get("/products/:id", product.listProductsByCategory);

// => Exportação do módulo
module.exports = routes;
