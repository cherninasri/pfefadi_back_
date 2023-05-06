const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    User: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'Order must be belong to user'],
    },
    
    product: {
          type: mongoose.Schema.ObjectId,
          ref: 'product',
         
     },
     
    Address: {
      phone: String,
      city: String,
      projectAdresse: String,

    },
 
  },
  { timestamps: true }
);

orderSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'User',
    select: 'name email phone',
  }).populate({
    path: 'product',
    select: 'title  ',
  });

  next();
});



const Order = mongoose.model('Order', orderSchema);
module.exports=Order
// In@in2016
//progahmedelsayed@gmail.com
