const { response } = require('express');
const User = require('../../models/User');

const register = async(req, res = response) => {
    const user = new User({
        name: 'Enzo',
        surname: 'Cazenave',
        email: 'encaze@uade.edu.ar',
        password: 'enzo24feb'
    });

    await user.save();

    return res.status(200).json({ user });
}

module.exports = register;