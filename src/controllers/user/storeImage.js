const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');

const storeImage = async (req, res = response) => {
    const { id, imageId } = req.params;
    const { storedStatus } = req.body;

    try {
        const user = await User.updateOne(
            { _id: id, 'profile_images.id': imageId },
            { $set: { 'profile_images.$.stored': storedStatus } }
        );

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        res.status(200).json({
            ok: true,
            stored: storedStatus
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = storeImage;