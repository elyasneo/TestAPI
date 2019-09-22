const express = require('express');
const router = express.Router();
const Product = require('../db/models/product')
const mongoose = require('mongoose')
const joi = require('@hapi/joi')

router.get('/', async (req, res, next) => {
    const products = await Product.find()
    res.status(200).json({
        msg: 'get all product',
        data: products
    })
})
router.get('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id)
        if (product) {
            res.status(200).json({
                msg: 'get special product wich id is ' + id,
                data: product
            })
        } else {
            res.status(404).json({
                msg: 'not Found'
            })
        }
    } catch (error) {
        res.status(510).json({
            msg: error.message
        })
    }

})

router.post('/', async (req, res, next) => {
    joi.validate(req.body, Product.productSchema,async (error,value) => {
        if (!error) {
            console.log(value);
            
            const product = new Product({
                _id: new mongoose.Types.ObjectId(),
                name: value.name,
                cost: value.cost
            })
           await product.save()
            res.status(201).json({
                msg: 'product created',
                data: product
            })
        } else {
            res.status(401).json({
                msg: error.details[0].message,
            })
        }
    })

})

router.patch('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        var product = await Product.updateOne({
            _id: id
        }, {
            $set: req.body
        })
        res.status(201).json({
            msg: `patch product by id ${id}`,
            data: product
        })
    } catch (error) {
        res.status(501).json({
            msg: error.message
        })
    }

})
router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await Product.remove({
            _id: id
        })
        if (product) {
            res.status(200).json({
                msg: 'remove special product wich id is ' + id,
            })
        } else {
            res.status(404).json({
                msg: 'not Found'
            })
        }
    } catch (error) {
        res.status(510).json({
            msg: error.message
        })
    }
})

module.exports = router;