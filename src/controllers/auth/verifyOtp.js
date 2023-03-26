const { compareSync, genSaltSync, hashSync } = require('bcryptjs');
const { response } = require('express');
const { sign } = require('jsonwebtoken');
const catchError = require('../../helpers/catchError');
const PendingUser = require('../../models/PendingUser');
const User = require('../../models/User');

const verifyOtp = async(req, res = response) => {

    const { name, surname, email, password, otp } = req.body;

    try {
        let user = await User.findOne({ email });

        if (user) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico está en uso.`
        });

        if (!email.endsWith('@uade.edu.ar')) return res.status(400).json({
            ok: false,
            msg: `El correo electrónico no pertenece a un alumno de UADE.`
        });

        const pendingUser = await PendingUser.findOneAndDelete({ email });
        const isOtpValid = compareSync(otp, pendingUser.otp);

        if (!isOtpValid) return res.status(400).json({
            ok: false,
            msg: 'El códito OTP es incorrecto.'
        });

        delete req.body.otp;

        user = new User(req.body);
        
        const salt = genSaltSync();
        user.password = hashSync(password, salt);
        await user.save();

        delete req.body.password;

        const tokenPayload = { ...req.body, _id: user._id };
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

module.exports = verifyOtp;