const getCustomer = async (req, res) => {
    const customer = req.user;

    if (!customer) {
        return res.status(401).json({
            "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
        });
    }
    return res.status(200).json(customer);
}

module.exports = {
    getCustomer
  }