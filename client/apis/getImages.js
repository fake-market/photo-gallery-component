import axios from 'axios';

const getImages = (id) => {
  const params = {
    productId: id
  };
  const url = 'http://localhost:1337/products/images';

  return new Promise((resolve, reject) => {
    axios({
      method: 'GET',
      url,
      params
    })
    .then(({ status, data }) => {
      if (status === 200) {
          resolve(data);
      } else {
          reject(new Error('error'));
      }
    });
  });
}

export default {
    getImages: getImages
};
