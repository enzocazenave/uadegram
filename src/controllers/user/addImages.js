const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');
const { uploadToBucket } = require('../../helpers/s3');
const sharp = require('sharp');

const addImages = async (req, res = response) => {
    const { image } = req.files;
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        const processedImage = sharp(image.data);
        const processedImageBuffer = await processedImage.jpeg({ quality: 50 }).toBuffer();

        const { Location, key } = await uploadToBucket({
            Key: image.name,
            Body: processedImageBuffer
        });

        user.profile_images = [...user.profile_images, { url: Location, id: key.split('.jpg')[0], stored: false }];
        await user.save();

        res.status(200).json({
            ok: true,
            image: {
                url: Location,
                id: key.split('.jpg')[0]
            }
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = addImages;