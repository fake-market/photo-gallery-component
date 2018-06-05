const { imageModel } = require('../models/imageModel.js');
const { postToAWS } = require('../helpers/awsUpload');

const imageController = {
  get: (req, res) => {
    imageModel.get(req.query.productId, (err, data) => {
      if (err) {
        console.log('GET imageController error,', err);
        res.send(err).status(400);
      }
      console.log('GET imageController successful');
      res.send(data).status(200);
    })
  },
  post: (req, res) => {
    console.log(req.files);
    let body = req.files[Object.keys(req.files)[0]].data;
    let name = req.files[Object.keys(req.files)[0]].name;
    let productId = Object.keys(req.files)[0].split(',')[1];
    postToAWS(body, name, (err, data) => {
      if (err) {
        console.log('error making AWS Post request', err);
        res.send(err).status(500);
      }
      else {
        console.log('successfully posted to AWS', data);
        imageModel.post(productId, name, (err, results) => {
          if (err) {
            console.log('error posting to DB,', err);
            res.send(err).status(400);
          } else {
            console.log('successfully created record in db');
            res.send(results).status(201);
          }
        })
      }
    })
  } 
}

module.exports = {
  imageController: imageController
}