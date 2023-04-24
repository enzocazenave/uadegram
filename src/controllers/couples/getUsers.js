const { response } = require("express");
const catchError = require('../../helpers/catchError');
const User = require("../../models/User");

const getUsers = async (req, res = response) => {
    const { id } = req.params;
    const { limit } = req.query;

    try {
        const users = await User.find({ gender: 0 }).skip(limit - 10).limit(limit);
        const user = await User.findById(id);

        const refactoredUsers = users.map(({ _doc: { _id, name, profile_images, about, birthdate, isOnline } }) => {
            return {
                _id,
                name,
                profileImages: profile_images,
                about,
                birthdate,
                isOnline,
            }
        }).filter((refactoredUser) => (
            user._id.toString() != refactoredUser._id.toString() &&
            refactoredUser.profileImages.length > 0 &&
            !(user.matches.includes(refactoredUser._id)) &&
            !(user.noMatches.includes(refactoredUser._id))
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