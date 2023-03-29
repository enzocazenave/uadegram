const User = require("../../models/User");

const noMatch = async(req, res = response) => {
    const { id } = req.params;
    const { userId } = req.body;

    try {
        const userMatch = await User.findById(id);

        if (!userMatch) return res.status(404).json({
            ok: false,
            msg: 'El usuario con el que quieres interactuar no existe.'
        });

        const user = await User.findByIdAndUpdate(userId, {
            $push: { noMatches: id }
        });

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario no existe.'
        });

        res.status(201).json({
            ok: true,
            match: false
        });
    } catch(error) {
        catchError(res, error);
    }
}

module.exports = noMatch;