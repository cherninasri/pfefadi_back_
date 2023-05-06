const express = require('express');
const {
  getAllOrder,
  createOrder,
  deleteOrder,
  updateOrder
} = require('../services/orderService');

const authService = require('../services/authService');

const router = express.Router();



router.route('/').get(
authService.protect,
authService.allowedTo('admin'),
 getAllOrder
  );

router.route('/').post(
  authService.protect,
  createOrder);

   router.route('/:id').delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteOrder);
    router.route('/:id').put(
    authService.protect,
    authService.allowedTo('admin'),
     updateOrder);





module.exports = router;
