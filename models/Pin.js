var mongoose = require('mongoose')

var schema = new mongoose.Schema({
    url: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
})

module.exports = mongoose.model('pin', schema)
