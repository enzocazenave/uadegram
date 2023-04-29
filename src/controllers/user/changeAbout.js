const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');

const changeAbout = async (req, res = response) => {
    const { id } = req.params;
    const { about } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { about });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        res.status(200).json({
            ok: true,
            about
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = changeAbout;