const { response } = require('express');

const verifyOtp = async(req, res = response) => {
    res.json({
        ok: true,
    })
}

module.exports = verifyOtp;