const express = require('express');

const {
 getRecus,
  getRecu,
  createRecu,

} = require('../services/RecuService');


const authService = require('../services/authService');


const router = express.Router();
router
  .route('/')
  .post(
    authService.protect,
    authService.allowedTo('admin'),
   createRecu
  )
  .get(getRecus);
router
  .route('/get')
  .get(authService.protect,
    authService.allowedTo('user'),
    getRecu)
  


module.exports = router;
