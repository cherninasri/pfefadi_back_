
const Recu = require('../models/RecuModel');
const{CreateDoc,delteOne,getAllTest,updateOne}=require('./Hfactory');
const asyncHandler = require('express-async-handler');









exports.getRecus = getAllTest(Recu);


exports.getRecu = asyncHandler(async(req,res,next)=>{

  const IDUSER= req.user._id
  const DOC = await Recu.find({User:IDUSER })
 res.status(200).json({data:DOC})
})
  ;


exports.createRecu= CreateDoc(Recu);


exports.updateRecu = updateOne(Recu);


exports.deleteRecu = delteOne(Recu);
