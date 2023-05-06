const express = require('express');

const {

  getclaims,
  getclaim,
  createclaim,
  deleteclaim,
  deleteAllClaims

} = require('../services/claimService ');


const authService = require('../services/authService');


const router = express.Router();


router
.route('/')
.post(
  authService.protect,
  authService.allowedTo('user'),
  createclaim
).get(authService.protect,
    authService.allowedTo('admin'),
    getclaims)
    
router
  .route('/get')
  .get(authService.protect,
    getclaim)
    
    router
    .route('/deleteAll').delete(
      authService.protect,
      authService.allowedTo('admin'),
      deleteAllClaims
      );
      router
      .route('/deleteOne/:id').delete(
        authService.protect,
          authService.allowedTo('admin'),
          deleteclaim);


module.exports = router;
