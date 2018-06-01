import React from 'react';
import axios from 'axios';

import GalleryImage from './GalleryImage.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product_id: 1,
      images: [],
      profile_image: ''
    };

    this.setProfileImage = this.setProfileImage.bind(this);
    this.changeProfileImage = this.changeProfileImage.bind(this);
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
        images: res.data,
      }, this.setProfileImage)
    })
    .catch(err => console.log('axios error fetching images,', err))
  }

  setProfileImage() {
    this.state.images.forEach(image => {
      if (image.is_primary === 1) {
        this.setState({
          profile_image: image.s3_url
        })
      }
    })
  }

  changeProfileImage(e) {
    console.log(e.target.src);
    this.setState({
      profile_image: e.target.src
    });
  }

  render() {
    return(
      <div>
        <img id="profile_image" src={this.state.profile_image} height="500" width="500" />
        <div>
          {this.state.images.map((image, index) => 
            <GalleryImage index={index} s3_url={image.s3_url} changeProfileImage={this.changeProfileImage} />
          )}
        </div>
      </div>
    )
  }

}