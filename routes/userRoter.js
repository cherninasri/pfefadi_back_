
const express = require('express');
const{userCreate,deleteOneUser,FindAllUser,updateOneUser,findMe,updateMe}=require('../services/userService');



const authService = require('../services/authService');


const router = express.Router();

router.route('/').get(authService.protect,
    authService.allowedTo('admin'),
     FindAllUser).post(userCreate);
    router.route('/updateme').put(authService.protect,updateMe);
router.route('/delete/:id').delete( authService.protect, authService.allowedTo('admin'),deleteOneUser);
 router.route('/findme').get(authService.protect,findMe)











module.exports = router;





