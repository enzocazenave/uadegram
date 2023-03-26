const configEmailSender = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: process.env.GMAIL_APP_EMAIL,
        pass: process.env.GMAIL_APP_PASSWORD
    }
}

module.exports = configEmailSender;