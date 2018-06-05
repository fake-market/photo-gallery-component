const router = require('express').Router();
const { imageController } = require('../controllers/imageController.js');

router.get('/products/images', imageController.get);
router.post('/products/images', imageController.post);

module.exports = {
  router: router
}