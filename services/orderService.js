
const asyncHandler = require('express-async-handler');

const{getAll,CreateDoc,delteOne,updateOne}=require('./Hfactory');
const Order = require('../models/orderModel');





// @desc    create cash order
// @route   POST /api/v1/orders/cartId
// @access  Protected/User

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
  if (req.user.role === 'user') req.filterObj = { user: req.user._id };
  next();
});

exports.createOrder= asyncHandler(async (req,res,next)=>
{
  const ID = req.user._id ;
  req.body.User=ID

  const DOC = await Order.create(req.body)

  res.status(200).json({data:DOC})
})



exports.getAllOrder=getAll(Order);

exports.deleteOrder=delteOne(Order)
exports.updateOrder=updateOne(Order)