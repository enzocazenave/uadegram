const { response } = require('express');
const catchError = require('../../helpers/catchError');
const User = require('../../models/User');

const getUser = async(req, res = response) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(400).json({
            ok: false,
            msg: 'No existe un usuario con ese identificador.'
        });

        res.status(200).json({
            ok: true,
            user: {
                name: user.name,
                surname: user.surname,
                email: user.email,
                profile_image: user.profile_image,
                profile_images: user.profile_images
            }
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = getUser;