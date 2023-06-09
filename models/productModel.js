const mongoose = require('mongoose');


const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'Too short product title'],
      maxlength: [100, 'Too long product title'],
    },
    
    description: {
      type: String,
      required: [true, 'Product description is required'],
      minlength: [10, 'Too short product description'],
    },
    quantity: {
      type: Number,
      
    },
    sold: {
      type: Number,
      default: 0,
    },
    
   
    

    
    images: [String],

    imageCover:String,

    
   
    category: {
      type: mongoose.Schema.ObjectId,
      ref: 'category',
    },
    
    
    ratingsAverage: {
      type: Number,
      min: [1, 'Rating must be above or equal 1.0'],
      max: [5, 'Rating must be below or equal 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Mongoose query middleware
const setImageUrl = (doc) => {
  if (doc.imageCover) {
    const imageCoverUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageCoverUrl;
  }
  if (doc.images) {
    const images = [];
    doc.images.forEach((image) => {
      const imageUrl = `${process.env.BASE_URL}/products/${image}`;
      images.push(imageUrl);
    });
    doc.images = images;
  }
};


productSchema.post('init', (doc) => {
  setImageUrl(doc);
  
});

// create
productSchema.post('save', (doc) => {
  setImageUrl(doc);
  
});
productSchema.pre(/^find/,function (next) {
  this.populate({path: 'category'});
  next();
})



module.exports = mongoose.model('product', productSchema);
