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
      if (!res) {
        console.log('did not find any existing products with product_id =', product_id, 'creating as primary');
        Image.create({
          product_id: product_id,
          is_primary: 1,
          s3_url: `https://s3-us-west-1.amazonaws.com/${BUCKET_NAME}/${name}`
        })
        .then((response) => {
          console.log('successfully posted primary file to db');
          callback(null, response);
        })
        .catch((err) => {
          console.log('error posting primary file to db', err);
          callback(err, null);
        })
      }
      else {
        console.log('product already exists in db, creating as non-primary');
        Image.create({
          product_id: product_id,
          is_primary: 0,
          s3_url: `https://s3-us-west-1.amazonaws.com/${BUCKET_NAME}/${name}`
        })
        .then((response) => {
          console.log('successfully posted file to db');
          callback(null, response);
        })
        .catch((err) => {
          console.log('error posting file to db', err);
          callback(err, null);
        })
      }
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