const check = async(req, res = response) => {
    res.status(200).json({
        ok: true,
        ...req.body
    });
}

module.exports = check;