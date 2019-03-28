const { Schema } = require('mongoose')

module.exports = {
    // User Schema
    User: new Schema({
        _id: String
    }),

    // Guild Schema
    Guild: new Schema({
        _id: String,
        prefix: { type: String, default: process.env.DEFAULT_PREFIX },
        count: { type: Boolean, default: false },
        countMessage: String,
        countChannel: String,
        partner: { type: Boolean, default: false },
        antInvite: { type: Boolean, default: false }
    })
}