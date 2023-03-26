const { response } = require('express');
const User = require('../../models/User');

const register = async(req, res = response) => {
    res.json({
        ok: true,
    })
}

module.exports = register;