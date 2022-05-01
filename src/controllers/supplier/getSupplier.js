const getSupplier = async (req, res) => {
    const supplier = req.user;

    if (!supplier) {
        return res.status(401).json({
            "mensagem": "Para acessar este recurso um token de autenticação válido deve ser enviado."
        });
    }
    return res.status(200).json(supplier);
}

module.exports = {
    getSupplier
  }