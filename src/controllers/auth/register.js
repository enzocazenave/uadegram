const { response } = require('express');
const PendingUser = require('../../models/PendingUser');
const User = require('../../models/User');
const catchError = require('../../helpers/catchError');
const generateOtpCode = require('../../helpers/generateOtpCode');
const nodemailer = require('nodemailer');
const configEmailSender = require('../../helpers/configEmailSender');
const { genSaltSync, hashSync } = require('bcryptjs');

const register = async(req, res = response) => {
    const { email } = req.body;

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

        const generatedOtpCode = generateOtpCode();
        const transport = nodemailer.createTransport(configEmailSender);

        await transport.sendMail({
            from: process.env.GMAIL_APP_EMAIL,
            to: email,
            subject: 'Uadegram - Código OTP de verificación',
            text: `Código OTP: ${ generatedOtpCode }`
        });

        const salt = genSaltSync();

        await PendingUser.deleteOne({ email });
        const pendingUser = new PendingUser({ email, otp: hashSync(generatedOtpCode, salt) });
        await pendingUser.save();

        res.status(200).json({
            ok: true
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = register;