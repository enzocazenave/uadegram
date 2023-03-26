const catchError = (response, error) => {
    console.error(error);

    response.status(500).json({
        ok: false,
        msg: 'Ocurrió un error inesperado, por favor repórtalo.'
    });
}

module.exports = catchError;