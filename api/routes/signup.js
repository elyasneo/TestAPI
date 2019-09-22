const express = require('express');
const router = express.Router();
const User = require('../db/models/user')
const mongoose = require('mongoose')
const joi = require('@hapi/joi');

router.post('/', async (req, res, next) => {
    try {
        joi.validate(req.body, User.userSchema, async (error, value) => {
            if (!error) {
                let user = await User.find({
                    username: req.body.username
                })
                if (user.length > 0) {
                    res.status(401).json({
                        msg: "username exist"
                    })
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        username: req.body.username,
                        password: req.body.password
                    })
                    await user.save()
                    res.status(200).json({
                        msg: "ok"
                    })
                }
            } else {
                res.status(401).json({
                    msg: error.details[0].message,
                })
            }
        })





    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: e
        })
    }
}) 
module.exports = router