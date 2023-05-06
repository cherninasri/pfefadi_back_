const express = require('express');


const {
  getCategories,
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  } = require('../services/categoryService');

const authService = require('../services/authService');





const router = express.Router();

// Nested route



router
  .route('/')
  .get(getCategories);
  router
  .route('/').post(
  authService.protect,
  authService.allowedTo('admin'),
  createCategory
  );
router
  .route('/:id')
  .get( getCategory);
  router
  .route('/:id').delete(
    authService.protect,
    authService.allowedTo('admin'),
    deleteCategory
  ).patch(authService.protect,
    authService.allowedTo('admin'),
   updateCategory
 )

  
module.exports = router;
