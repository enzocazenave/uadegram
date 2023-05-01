const User = require("../../models/User");

const saveSettings = async (req, res = response) => {
    const { id } = req.params;
    const { gender, genderYouSearch } = req.body;

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({
            ok: false,
            msg: 'El usuario con el que quieres interactuar no existe.'
        });

        if (user.gender !== gender) {
            user.gender = gender;
        }

        if (user.genderYouSearch !== genderYouSearch) {
            user.genderYouSearch = genderYouSearch;
        }

        await user.save();

        res.status(201).json({
            ok: true,
        });
    } catch (error) {
        catchError(res, error);
    }
}

module.exports = saveSettings;