const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      },
   
    User: {
      type: mongoose.Schema.ObjectId,
      ref: 'user',
      required: [true, 'Order must be belong to user'],
    },
  },
  
  { timestamps: true }
);

module.exports = mongoose.model('claim', claimSchema);
