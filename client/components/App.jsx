import React from 'react';
import axios from 'axios';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product_id: 1,
      images: []
    };
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    axios.get('/products/images', {
      params: {
        product_id: this.state.product_id
      }
    })
    .then(res => {
      console.log('axios fetch images successful', res);
      this.setState({
        images: res.data
      })
    })
    .catch(err => console.log('axios error fetching images,', err))
  }

  render() {
    return(
      <div>
        <img id="profile_image" src="https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone1.jpg" height="300" width="300" />
      </div>
    )
  }

}