const router = require('express').Router();
const { imageController } = require('../controllers/imageController.js');

router.get('/product/images', imageController.get);

module.exports = {
  router: router
}