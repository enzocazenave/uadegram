const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');

const changeStatus = async (req, res = response) => {
    const { id } = req.params;
    const { isOnline } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { isOnline });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        res.status(200).json({
            ok: true,
            isOnline
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = changeStatus;