var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    name: String,
    picture:String,
    twitter: {
        id: String
    }
})

module.exports = mongoose.model('user', schema)
