const { model, Schema } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        default: 'https://d500.epimg.net/cincodias/imagenes/2016/07/04/lifestyle/1467646262_522853_1467646344_noticia_normal.jpg'
    },
    profile_images: {
        type: Array,
        default: []
    },
    matches: {
        type: Array,
        default: []
    },
    noMatches: {
        type: Array,
        default: []
    },
    about: {
        type: String,
        default: ''
    },
    birthdate: {
        type: Date,
        default: null
    },
    gender: {
        type: Number,
        default: -1
    },
    career: {
        type: Number,
        default: -1
    },
    isOnline: {
        type: Boolean,
        default: false
    }
});

UserSchema.path('profile_image').validate((value) => {
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(value);
}, 'Invalid profile image url');

UserSchema.path('email').validate((value) => value.endsWith('@uade.edu.ar'), 'Email dont ends with domain: @uade.edu.ar');

module.exports = model('User', UserSchema);