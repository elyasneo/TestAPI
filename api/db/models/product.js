const mongoose = require('mongoose');
const joi = require('@hapi/joi');

const schema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        
    },
    cost: {
        type: Number,
        required: true
    }
})
const nameValidator=joi.object().keys({
    firstname:joi.string().min(3).max(100).regex(/^[a-zA-Z]{3,100}/).required().lowercase(),
    lastname:joi.string().min(3).max(100).regex(/^[a-zA-Z]{3,100}/).required()
})

module.exports = mongoose.model("Product", schema)
const base = joi.object().keys({
    name: nameValidator
})

module.exports.productSchema = base.keys({
    cost: joi.string().required().regex(/^[0-9]{4,11}$/)
})