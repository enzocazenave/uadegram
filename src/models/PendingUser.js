const { model, Schema } = require('mongoose');

const PendingUserSchema = Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    }
});

PendingUserSchema.path('email').validate((value) => value.endsWith('@uade.edu.ar'), 'Email dont ends with domain: @uade.edu.ar');

module.exports = model('PendingUser', PendingUserSchema);