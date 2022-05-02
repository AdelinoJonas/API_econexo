<h1 align="center">api_econexo
</h1>

Abrir o repositório no editor de código de sua preferência e rode os comandos abaixo para instalar os pacotes e rodar a aplicação no servidor local.
 
```javascript

npm install
npm run dev

```

### **Sobre**
Esta é uma RESTful API  de um market place que permite:

-   Se cadastrar como cliente ou como fornecedor(com criptografia de senha);
-   Fazer Login como cliente ou como fornecedor;
-   Detalhar Cliente;
-   Detalhar Fornecedor;
-   Armazenar dados em Banco (PostgreSQL);
-   Cadastrar produto;
-   Detalhar produto;
-   Listar produtos;
-   Editar produto;
-   Remover produto;
-   Filtrar por produtos;
-   
**Como utilizar o App**

**Importante: Sempre que a validação de uma requisição falhar, será exibida uma resposta de erro e mensagem adequada à situação.**

**Exemplo:**

```javascript
// Quando é informado um id de um fornecedor que não existe:
// HTTP Status 404
{
    "mensagem": "fornecedor não encontrado!"
}
```

## **Banco de dados**

Foi criado um Banco de Dados PostgreSQL chamado `api_econexo_db` contendo as seguintes tabelas e colunas:  

-   usuarios
    -   id
    -   nome
    -   cpf
    -   endereço
    -   email (campo único)
    -   senha
    
-   fornecedores
    -   id
    -   nome (o nome da loja deste vendedor)
    -   segmento
    -   cnpj
    -   telefone
    -   endereco
    -   nome (o nome da loja deste vendedor)
    -   email (campo único)
    -   senha
    
-   produtos
    -   id
    -   nome
    -   imagem
    -   categoria
    -   descricao
    -   preco 

## **Endpoints**

Para testar o produto, abra uma ferramenta cliente de API Rest e utilize as rotas abaixo:

### **Cadastrar Cliente**

#### `POST` `/customer`

http://localhost:3000/customer

Essa é a rota que será utilizada para cadastrar um novo cliente no sistema.

#### **Exemplo de requisição**
```javascript
// POST /cliente
{
    "nome": "testando",
    "email": "teste@email.com",
    "cpf": "12345678961",
    "endereco": "Rua x",
    "senha": "12345"
}
```
### **Login do Cliente**

#### `POST` `/customer/login`

http://localhost:3000/customer/login

Essa é a rota que permite o cliente cadastrado realizar o login no sistema.

#### **Exemplo de requisição**
```javascript
// POST /customer/login
{
    "email": "jose@madeirareciclada.com.br",
    "senha": "j1234"
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjIzMjQ5NjIxLCJleHAiOjE2MjMyNzg0MjF9.KLR9t7m_JQJfpuRv9_8H2-XJ92TSjKhGPxJXVfX6wBI"
}
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "E-mail e/ou senha inválido(s)."
}
```

---

## **ATENÇÃO**: Todas as funcionalidades (endpoints) a seguir, a partir desse ponto, deverão exigir o token de autenticação do usuário/fornecedor logado, recebendo no header com o formato Bearer Token.
---

### **Detalhar Cliente**

#### `GET` `/customer`

http://localhost:3000/customer

Essa é a rota que será chamada quando o usuario quiser obter os dados do seu próprio perfil.  

#### **Exemplo de requisição**
```javascript
// GET /usuario
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
{
    "id": 1,
    "nome": "Material de Construção",
    "email": "construcao@email.com",
    "segmento": "Madeira",
    "cnpj": "38739873594",
    "telefone": "41984498900",
    "endereco": "Rua x",
    "senha": "$2b$10$yziHx6UT/AwuQVqRdrvkkOhqmvxrTLUskT5R606f7aI2j.DPy8HzW"
}

```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

### **Cadastrar produto para o Fornecedor logado**

#### `POST` `/products`

http://localhost:3000/products

Essa é a rota que será utilizada para cadastrar um produto associado ao usuário logado.  

#### **Exemplo de requisição**
```javascript
// POST /products
  {
        "id": 1,
        "usuario_id": 1,
        "nome": "Biomassa",
        "quantidade": 12,
        "categoria": "construção",
        "preco": 4990,
        "descricao": "cimento ecologico.",
        "imagem": "https://bit.ly/3ctikxq",
    }
```

### **Listar produtos**

#### `GET` `/products`

http://localhost:3000/products

Essa é a rota que será chamada quando o cliente logado quiser listar todos os seus produtos cadastrados.   

#### **Exemplo de requisição**
```javascript
// GET /produtos/44
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
  {
        "id": 1,
        "usuario_id": 1,
        "nome": "Biomassa",
        "quantidade": 12,
        "categoria": "construção",
        "preco": 4990,
        "descricao": "cimento ecologico.",
        "imagem": "https://bit.ly/3ctikxq",
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "ripa",
        "quantidade": 8,
        "categoria": "madeira",
        "preco": 4490,
        "descricao": "Ripa 1x2.",
        "imagem": "https://bit.ly/3ctikxq",
    },
]
```

### **Detalhar um produto**

#### `GET` `/products/:id`

http://localhost:3000/products/:id

Essa é a rota que será chamada quando o cliente logado quiser obter um dos seus produtos cadastrados.  

#### **Exemplo de requisição**
```javascript
// GET /produtos/44
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
   {
        "id": 1,
        "usuario_id": 1,
        "nome": "Biomassa",
        "quantidade": 12,
        "categoria": "construção",
        "preco": 4990,
        "descricao": "cimento ecologico.",
        "imagem": "https://bit.ly/3ctikxq",
    }
```

### **Atualizar produto do usuário logado**

#### `PUT` `/products/:id`

http://localhost:3000/products/5

Essa é a rota que será chamada quando o cliente logado quiser atualizar um dos seus produtos cadastrados.  

#### **Exemplo de requisição**
```javascript
// PUT /products/2
   {
     "id": 1,
     "usuario_id": 1,
     "nome": "Biomassa",
     "quantidade": 12,
     "categoria": "construção",
     "preco": 4990,
     "descricao": "cimento ecologico.",
     "imagem": "https://bit.ly/3ctikxq",
}
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
// Sem conteúdo no corpo (body) da resposta
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "O usuário autenticado não ter permissão para alterar este produto."
}
```

### **Excluir produto do usuário logado**

#### `DELETE` `/products/:id`

http://localhost:3000/products/5

Essa é a rota que será chamada quando o usuario logado quiser excluir um dos seus produtos cadastrados.  

#### **Exemplo de requisição**
```javascript
// DELETE /produtos/88
// Sem conteúdo no corpo (body) da requisição
```

---

### **Filtrar produtos por categoria**

#### **Exemplo de requisição**
```javascript
// GET /produtos?categoria=camisas
// Sem conteúdo no corpo (body) da requisição
```

#### **Exemplos de resposta**

```javascript
// HTTP Status 200 / 201 / 204
[
    {
        "id": 1,
        "usuario_id": 1,
        "nome": "Biomassa",
        "quantidade": 12,
        "categoria": "construção",
        "preco": 4990,
        "descricao": "cimento ecologico.",
        "imagem": "https://bit.ly/3ctikxq",
    },
    {
        "id": 2,
        "usuario_id": 1,
        "nome": "ripa",
        "quantidade": 8,
        "categoria": "madeira",
        "preco": 4490,
        "descricao": "Ripa 1x2.",
        "imagem": "https://bit.ly/3ctikxq",
    },
]
```
```javascript
// HTTP Status 200 / 201 / 204
[]
```
```javascript
// HTTP Status 400 / 401 / 403 / 404
{
    "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
}
```

