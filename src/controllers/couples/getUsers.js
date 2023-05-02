const { response } = require("express");
const catchError = require('../../helpers/catchError');
const User = require("../../models/User");

const getUsers = async (req, res = response) => {
    const { id } = req.params;
    const { limit } = req.query;

    try {
        const user = await User.findById(id);
        const users = await User.find({ gender: user.genderYouSearch }).skip(limit - 10).limit(limit);

        const refactoredUsers = users.map(({ _doc: { _id, name, profile_images, about, birthdate, isOnline, genderYouSearch } }) => {

            const profileImages = profile_images.filter(image => !image.stored);

            return {
                _id,
                name,
                profileImages,
                about,
                birthdate,
                isOnline,
                genderYouSearch
            }
        }).filter((refactoredUser) => (
            user._id.toString() != refactoredUser._id.toString() && // QUE LA ID DEL USUARIO SEA DISTINTA DEL QUE REALIZA LA PETICION
            refactoredUser.profileImages.length > 0 && // QUE EL USUARIO TENGA IMAGENES SUBIDAS A SU PERFIL
            !(user.matches.includes(refactoredUser._id)) && // QUE EL USUARIO NO TENGA LIKE DEL QUE REALIZA LA PETICION
            !(user.noMatches.includes(refactoredUser._id)) && // QUE EL USUARIO NO TENGA UN DISLIKE DEL QUE REALIZA LA PETICION
            user.gender == refactoredUser.genderYouSearch // QUE EL GENERO QUE BUSCA EL USUARIO SEA EL DEL QUE REALIZA LA PETICION
        ));

        res.status(200).json({
            ok: true,
            users: refactoredUsers
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = getUsers;