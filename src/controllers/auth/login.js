const { response } = require('express');
const User = require('../../models/User');

const login = async(req, res = response) => {
    res.json({
        ok: true,
    })
}

module.exports = login;