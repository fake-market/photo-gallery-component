const { Image } = require('../../db/schemas/index.js');
const { BUCKET_NAME } = require('../../config/aws.config');

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
  post: (product_id, name, callback) => {
    Image.findOne({
      where: {
        product_id: product_id
      }
    })
    .then((res) => {
      let message = res ? 'product already exists in db, creating as non-primary' : `did not find any existing products with product_id = ${product_id}, creating as primary`;
      console.log(message);
      Image.create({
        product_id: product_id,
        is_primary: (res ? 0 : 1),
        s3_url: `https://s3-us-west-1.amazonaws.com/${BUCKET_NAME}/${name}`
      })
      .then((response) => {
        console.log('successfully posted to db');
        callback(null, response);
      })
      .catch((err) => {
        console.log('error posting to db', err);
        callback(err, null);
      })
    })
    .catch((err) => {
      console.log('error querying db', err);
      callback(err, null);
    })
  }
}

module.exports = {
  imageModel: imageModel
}