const mongoose = require('mongoose')

const verifySchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    uspNumber: {
        type: Number,
        default: 0
    },
    course: {
        type: Number,
        required: true
    },
    otherCourse: {
        type: String,
    },
    class: {
        type: Number,
        required: true
    },
    accepted: {
        type: Boolean,
        default: false
    },
    read: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

const FormVerify = mongoose.model('FormVerify', verifySchema)

module.exports = FormVerify