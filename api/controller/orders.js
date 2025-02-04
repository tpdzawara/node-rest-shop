const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

exports.orders_get_all =  (req, res, next) => {
    Order.find()
        .select('product quantity _id')
        .populate('product')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                oders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        product: doc.product,
                        quantity: doc.quantity,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders' + doc._id
                        }
                    }
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.orders_get_order = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }
            const order = new Order({
                _id: mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                product: req.body.productId
            });
            return order
                .save()
                 })
                 .then(result => {
                    console.log(result);
                    res.status(201).json({
                        message: 'Order stored',
                        createdOrder: {
                            _id: result._id,
                            product: result.product,
                            quantity: result.quantity
                        },
                        request: {
                            type: 'GET',
                            url: 'http://localhsot:3000/orders/' + result._id
                        }
                    });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Product not found',
                error: err
            });
        });

}

exports.order_get_one = (req, res, next) => {
    Order.findById(req.params.orderId)
    .populate('product')
    .exec()
    .then(order => {
        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            })
        }
        res.status(200).json({
            order: order,
            request: {
                type: 'GET',
                url: 'http://localhost:3000/orders'
            }
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
}

exports.order_delete = (req, res, next) => {
    Order.remove({ _id: req.params.orderId })
    .exec()
    .then( result => {
        res.status(200).json({
            message: 'Oder deleted',
            request: {
                type: 'GET',
                url: 'http:/localhost:3000/orders',
                body: { productId: 'ID', quantity: 'Number' }
            }
        })
    })
    .catch( err => {
        res.status(500).json({
            error: err
        });
    });
}