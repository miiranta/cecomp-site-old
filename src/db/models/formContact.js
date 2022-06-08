const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    typeOfContact: {
        type: Number,
        default: 0,
        required: true
    },
    emailForRuturn: {
        type: String,
    },
    message: {
        type: String,
        required: true
    }
},{
    timestamps: true
})

const FormContact = mongoose.model('FormContact', contactSchema)

module.exports = FormContact