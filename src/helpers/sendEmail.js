const nodemailer = require('nodemailer');
const configEmailSender = require('./configEmailSender');

const sendMail = async(to, subject, text) => {
    const transport = nodemailer.createTransport(configEmailSender);

    await transport.sendMail({
        from: process.env.GMAIL_APP_EMAIL,
        to,
        subject,
        text
    });
}

module.exports = sendMail;