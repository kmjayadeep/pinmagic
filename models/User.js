var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: String,
    picture: String,
    twitter: {
        id: String,
    },
    userId: String
})

module.exports = mongoose.model('user', schema)
