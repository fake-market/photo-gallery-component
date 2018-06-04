const { Image } = require('../../db/schemas/index.js');

const imageModel = {
  get: (product_id, callback) => {
    Image.findAll({
      where: {
        product_id: product_id
      }
    })
    .then((res) => {
      console.log('successfully queried db');
      callback(null, res);
    })
    .catch((err) => {
      console.log('error querying db', err);
      callback(err, null);
    })
  },
  post: (callback) => {
    
  }
}

module.exports = {
  imageModel: imageModel
}