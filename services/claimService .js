
const claim = require('../models/claimModel');
const{CreateDoc,delteOne,getAllTest,updateOne}=require('./Hfactory');
const asyncHandler = require('express-async-handler');









exports.getclaims = getAllTest(claim);


exports.getclaim = asyncHandler(async(req,res,next)=>{

  const IDUSER= req.user._id
  const DOC = await claim.findOne({User:IDUSER })
 res.status(200).json({data:DOC})
})
  ;


exports.createclaim= CreateDoc(claim);





exports.deleteAllClaims = asyncHandler(async(req,res,next)=>{


   await claim.remove()
 res.status(200).json({data:' data null'})
})
  
  

  exports.deleteclaim = delteOne(claim);