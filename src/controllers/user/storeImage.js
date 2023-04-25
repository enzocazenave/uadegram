const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');

const storeImage = async (req, res = response) => {
    const { id, imageId } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, {});

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        res.status(200).json({
            ok: true,
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = storeImage;