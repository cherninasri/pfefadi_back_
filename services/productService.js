
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const asyncHandler = require('express-async-handler');
const ApiFeatures = require('../utils/apiFeatures');



const Product = require('../models/productModel');


const{CreateDoc,findOne,delteOne,getAll,getAllTest,updateOne}=require('./Hfactory');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');


// Upload single image

exports.uploadProductImages = uploadMixOfImages([
  {
    name: 'imageCover',
    maxCount: 1,
  },
  {
    name: 'images',
    maxCount: 5,
  },
]);

exports.resizeProductImages = asyncHandler(async (req, res, next) => {
  // console.log(req.files);
  //1- Image processing for imageCover
  if (req.files.imageCover) {
    const imageCoverFileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`;

    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 2000)
      .toFormat('jpeg')
      .jpeg({ quality: 95 })
      .toFile(`uploads/products/${imageCoverFileName}`);

    // Save image into our db
    req.body.imageCover = imageCoverFileName;
  }
  //2- Image processing for images
  if (req.files.images) {
    req.body.images = [];
    await Promise.all(
      req.files.images.map(async (img, index) => {
        const imageName = `product-${uuidv4()}-${Date.now()}-${index + 1}.jpeg`;

        await sharp(img.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 95 })
          .toFile(`uploads/products/${imageName}`);

        // Save image into our db
        req.body.images.push(imageName);
      })
    );

    
  }
  next();
});


exports.createProduct=CreateDoc(Product);
    
exports.getProduct=findOne(Product);

exports.getGategoryProduct=asyncHandler(async(req,res)=>{

 
  
  

  const apiFeatures = new ApiFeatures(Product.find({category:req.params.id}), req.query)
        .filter()
        .limitFields()
        //.search(modelName)
        .sort();
      // .paginate();
  
      // Apply pagination after filer and search
      const docsCount = await Product.countDocuments(apiFeatures.mongooseQuery);
      apiFeatures.paginate(docsCount);
  
      // Execute query
      const { mongooseQuery, paginationResult } = apiFeatures;
      const documents = await mongooseQuery;
  
      // Set Images url
     // if (Model.collection.collectionName === 'products') {
       // documents.forEach((doc) => setImageUrl(doc));
      //}
      res
        .status(200)
        .json({ results: docsCount, paginationResult, data: documents });
    });


exports.deleteProduct=delteOne(Product);


exports.getProducts = getAllTest(Product,'Products');


exports.updateProduct = updateOne(Product);


