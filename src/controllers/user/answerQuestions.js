const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');
const { sign } = require('jsonwebtoken');

const answerQuestions = async(req, res = response) => {
    const { id } = req.params;
    const { birthdate, gender, career } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        if (gender > 2 || gender < 0) return res.status(400).json({
            ok: false,
            msg: 'El género proporcionado es inválido.'
        })

        user.birthdate = birthdate;
        user.gender = gender;
        user.career = career;

        await user.save();

        delete user.password;

        const tokenPayload = {
            _id: user._id,
            email: user.email,
            name: user.name,
            surname: user.surname,
            profile_image: user.profile_image,
            career: user.career,
            birthdate: user.birthdate
        }

        const token = sign(tokenPayload, process.env.SECRET_TOKEN_KEY, { expiresIn: process.env.SECRET_TOKEN_EXPIRATION_TIME })
        tokenPayload.token = token;

        res.status(201).json({
            ok: true,
            session: tokenPayload
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = answerQuestions;