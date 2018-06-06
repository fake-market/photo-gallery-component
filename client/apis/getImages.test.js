import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('Get Images API', () => {
  it('returns data when getImages is called', done => {
    var mock = new MockAdapter(axios);
    const data = {
      images: [
        {
          id: 1,
          product_id: 1,
          is_primary: 1,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone1.jpg'
        },
        {
          id: 2,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone2.jpg'
        },
        {
          id: 3,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone3.jpg'
        },
        {
          id: 4,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone4.jpg'
        },
        {
          id: 5,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone5.jpg'
        },
        {
          id: 6,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone6.jpg'
        },
        {
          id: 7,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone7.jpg'
        },
        {
          id: 8,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone8.jpg'
        },
        {
          id: 9,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone9.jpg'
        },
        {
          id: 10,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone10.jpg'
        },
        {
          id: 11,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone11.jpg'
        },
        {
          id: 12,
          product_id: 1,
          is_primary: 0,
          s3_url: 'https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone12.jpg'
        },
      ]
    };

    mock.onGet('/products/images', { params: { productId: 1 } }).reply(200, data);
    mock.onPost('/products/images', { params: { productId: 1 } }).reply(201, data) ;

    axios.get('/products/images', { params: { productId: 1 } }) 
    .then(function(response) {
      expect(response.data).toEqual(data);
      done();
    });

    axios.post('/products/images', { params: { productId: 1 } }) 
    .then(function(response) {
      expect(response.data).toEqual(data);
      done();
    });

  });
});