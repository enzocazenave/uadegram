const { response } = require('express');
const catchError = require('../../helpers/catchError');
const cloudinary = require('../../helpers/cloudinary');
const User = require('../../models/User');

const addImages = async(req, res = response) => {
    const { images = [] } = req.body;
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        const arrayOfImages = await Promise.all(
            images.map(async(image) => {
                const { secure_url } = cloudinary.uploader.upload(image, {
                    folder: 'user_images'
                });

                return secure_url;
            })
        );

        user.profile_images = [...user.profile_images, ...arrayOfImages];
        await user.save();

        res.status(200).json({
            ok: true,
            images: arrayOfImages
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = addImages;