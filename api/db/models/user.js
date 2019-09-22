const mongoose = require('mongoose');
const joi = require('@hapi/joi');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:true
    }
})
module.exports = mongoose.model("User", schema)

module.exports.userSchema = joi.object().keys({
    username:joi.string().required(),
    password:joi.string().required()
  })