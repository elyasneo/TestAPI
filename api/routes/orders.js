const express = require('express')
const mongoose = require('mongoose')
const router = express.Router();
const Order = require('../db/models/order')

router.get('/',async (req, res, next) => {
    try {
        var order = await Order.find().select('_id product quantity').populate('product').exec()
        res.status(200).json({
            msg: `orders fetched`,
            data: order
        })
    } catch (error) {
        res.status(510).json({
            msg: error.message
        })
    }
   
})
router.post('/', async (req, res, next) => {
    try {
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        })
        await order.save()
        res.status(201).json({
            msg: 'orders created',
            data: order
        })
    } catch (error) {
        res.status(510).json({
            msg: error.message
        })
    }
   
})
router.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    var order = await Order.findById(id).select('_id productId quantity').populate('productId').exec()
    res.status(200).json({
        msg: `orders details by id ${id}`,
        data: order
    })
})
router.delete('/:id',async (req, res, next) => {
    const id = req.params.id;
    await Order.deleteOne({_id:id})
    res.status(200).json({
        data: 'orders deleted',
        id: id
    })
})



module.exports = router;