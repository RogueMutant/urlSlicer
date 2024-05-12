const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    originalUrl:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Url', urlSchema)