const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');
const mongoose = require('mongoose');
const { uploadToBucket } = require('../../helpers/s3');

const addImages = async(req, res = response) => {
    const { image } = req.files;
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        console.log(image);

        const result = await uploadToBucket(image);
    
        user.profile_images = [...user.profile_images, { url: result.Location, id: new mongoose.Types.ObjectId() }];
        await user.save();

        res.status(200).json({
            ok: true,
            image: result.Location
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = addImages;