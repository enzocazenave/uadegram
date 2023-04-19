const { response } = require("express");
const catchError = require('../../helpers/catchError');
const User = require("../../models/User");

const getUsers = async(req, res = response) => {
    const { gender } = req.params;
    const { limit } = req.query;

    try {
        const users = await User.find({ gender }).skip(limit - 10).limit(limit)

        const refactoredUsers = users.map(({ _doc: { _id, name, profile_images, about, birthdate, isOnline }}) => {
            return {
                _id,
                name,
                profileImages: profile_images,
                about,
                birthdate,
                isOnline
            }
        });

        res.status(200).json({
            ok: true,
            users: refactoredUsers
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = getUsers;