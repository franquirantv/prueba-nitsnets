const { response } = require('express');
const { validationResult } = require('express-validator');

// Middleware para validar que los campos no esten vacíos
const validarCampos = (req, res = response, next) => {

    const erroresVal = validationResult(req);

    if (!erroresVal.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errores: erroresVal.mapped()
        });
    }

    next();

}
module.exports = { validarCampos }