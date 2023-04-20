const { response } = require('express');
const catchError = require('../../helpers/catchError');
const cloudinary = require('../../helpers/cloudinary');
const User = require('../../models/User');
const mongoose = require('mongoose');

const addImages = async(req, res = response) => {
    const { image } = req.files;
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        /*const arrayOfImages = await Promise.all(
            images.map(async(image) => {
                const { secure_url } = await cloudinary.uploader.upload(image, {
                    folder: 'user_images'
                });

                return secure_url;
            })
        );*/

        const { secure_url } = await cloudinary.uploader.upload(image.tempFilePath, {
            folder: 'user_images'
        });

        user.profile_images = [...user.profile_images, { url: secure_url, id: new mongoose.Types.ObjectId() }];
        await user.save();

        res.status(200).json({
            ok: true,
            image: secure_url
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = addImages;