const { response } = require('express');
const PendingUser = require('../../models/User');

const verifyOtp = async(req, res = response) => {
    res.json({
        ok: true,
    })
}

module.exports = verifyOtp;