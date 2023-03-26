const { model, Schema } = require('mongoose');

const PendingUserSchema = Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: Number,
        required: true
    }
});

PendingUserSchema.path('otp').validate((value) => value > 99999 && value < 1000000, 'Invalid otp code');
PendingUserSchema.path('email').validate((value) => value.endsWith('@uade.edu.ar'), 'Email dont ends with domain: @uade.edu.ar');

module.exports = model('PendingUser', PendingUserSchema);