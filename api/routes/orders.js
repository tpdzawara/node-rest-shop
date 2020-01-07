const router = require('express').Router();
const checkAuth = require('../middleware/check-auth');
const ordersController = require('../controller/orders')
//Handle incoming Get routes to /oders
router.get('/', checkAuth, ordersController.orders_get_all);

router.post('/', checkAuth, ordersController.orders_get_order);

router.get('/:orderId', checkAuth, ordersController.order_get_one);

router.delete('/:orderId', checkAuth, ordersController.order_delete);


module.exports = router;