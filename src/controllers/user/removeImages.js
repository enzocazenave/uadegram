const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');
const { removeFile } = require('../../helpers/s3');

const removeImages = async (req, res = response) => {
    const { id, imageId } = req.params;

    try {
        const user = await User.findByIdAndUpdate(id, {
            $pull: {
                profile_images: { id: imageId }
            }
        });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        await removeFile(imageId);

        res.status(200).json({
            ok: true,
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = removeImages;