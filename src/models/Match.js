const { model, Schema } = require('mongoose');

const MatchSchema = Schema({
    first_user: {
        type: String,
        required: true
    },
    second_user: {
        type: String,
        required: true
    }
});

module.exports = model('Match', MatchSchema);