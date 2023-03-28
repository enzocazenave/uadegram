const { verify } = require('jsonwebtoken');

const tokenValidator = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) return res.status(401).json({
        ok: false,
        msg: 'No se recibió un token de autenticación.'
    });

    try {
        const tokenPayload = verify(token, process.env.SECRET_TOKEN_KEY);
        delete tokenPayload.iat;
        delete tokenPayload.exp;

        req.body = { ...tokenPayload, token };
        next();
    } catch(error) {
        res.status(401).json({
            ok: false,
            msg: 'El token de autenticación es inválido.'
        });
    }
}

module.exports = {
    tokenValidator
};