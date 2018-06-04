const { imageModel } = require('../models/imageModel.js');
const formidable = require('formidable');
const fs = require('fs');
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
    console.log(req.files.fileUpload);
    postToAWS(req.files.fileUpload.data, req.files.fileUpload.name, (err, results) => {
      if (err) {
        console.log('error making AWS Post request', err);
      }
      else {
        console.log('successfully posted to AWS', results);
      }
    })
    // const bodystream = fs.createReadStream(req.file.pic.path);
    // console.log(bodystream);
    
    res.send();
    // imageModel.post((err, data) => {
    //   if (err) {
    //     console.log('POST imageController error,', err);
    //     res.send(err).status(400);
    //   }
    //   console.log('POST imageController successful');
    //   res.send().status(201);
    // })
  } 
}

module.exports = {
  imageController: imageController
}