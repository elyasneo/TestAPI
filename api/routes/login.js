const express = require('express');
const router = express.Router();
const User = require('../db/models/user')
const mongoose = require('mongoose')
const joi = require('@hapi/joi');


router.post('/', async (req, res, next) => {
    try {
        joi.validate(req.body, User.userSchema, async (error, value) => {
            if (!error) {
                let user = await User.findOne({
                    username: req.body.username
                })
                if (!user) {
                    res.status(401).json({
                        msg: "auth failed"
                    })
                } else {
                    res.status(200).cookie('token', "eybsadbiasdbiu3ibsadasdiubasd", {
                        httpOnly: false
                    }).json({
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