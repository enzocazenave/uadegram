const { compareSync } = require('bcryptjs');
const { response } = require('express');
const { sign } = require('jsonwebtoken');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');

const login = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!email.endsWith('@uade.edu.ar')) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico no pertenece a un alumno de UADE.`
        });

        if (!user) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });

        const isPasswordValid = compareSync(password, user.password);

        if (!isPasswordValid) return res.status(400).json({
            ok: false,
            msg: 'Sus credenciales son incorrectas.'
        });

        const tokenPayload = {
            _id: user._id,
            email,
            name: user.name,
            surname: user.surname,
            profile_image: user.profile_image
        }
        const token = sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.SECRET_TOKEN_EXPIRATION_TIME });
        tokenPayload.token = token;

        res.status(201).json({
            ok: true,
            session: tokenPayload
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = login;