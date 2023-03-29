const { response } = require('express');
const catchError = require('../../helpers/catchError');
const Match = require('../../models/Match');
const User = require('../../models/User');

const match = async(req, res = response) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const userMatch = await User.findById(id);

        if (!userMatch) return res.status(404).json({
            ok: false,
            msg: 'El usuario con el que quieres interactuar no existe.'
        });

        const user = await User.findByIdAndUpdate(userId, {
            $push: { matches: id }
        });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        const isMatch = userMatch.matches.some(matchUser => matchUser === userId);

        if (!isMatch) return res.status(201).json({
            ok: true,
            match: false
        });

        const match = new Match({
            first_user: id,
            second_user: userId
        });

        await match.save();

        res.status(201).json({
            ok: true,
            match: true
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = match;