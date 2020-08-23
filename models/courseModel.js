const {Schema, model} = require('mongoose')

const course = new Schema({
    header_name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photo: {
        type: String
    }
})

module.exports = model('courses', course)