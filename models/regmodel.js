const {Schema, model} = require('mongoose')

const registration = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    photo: {
        type: String
    },
    resetToken: String,
    resetTokenExp: Date,
    password: {
        type: String,
        required: true
    }
})

module.exports = model('users', registration)