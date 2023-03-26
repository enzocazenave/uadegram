const generateOtpCode = (limit = 6) => {
    let digits = '0123456789';
    let otpCode = '';

    for (let i = 0; i < limit; i++) {
        otpCode += digits[Math.floor(Math.random() * 10)];
    }

    return otpCode;
}

module.exports = generateOtpCode;