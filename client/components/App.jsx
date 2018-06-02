import React from 'react';
import ReactImageMagnify from 'react-image-magnify'
import axios from 'axios';

import GalleryImage from './GalleryImage.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      product_id: 1,
      images: [],
      profile_image: '',
      startIndex: 0,
      endIndex: 5
    };
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
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

  handleClickNext() {
    if (this.state.endIndex !== this.state.images.length - 1) {
      if (this.state.images.length - this.state.endIndex < 6) {
        let shift = this.state.images.length - this.state.endIndex;
        this.setState({
          startIndex: this.state.startIndex + shift,
          endIndex: this.state.endIndex + shift
        });
      } else {
        this.setState({
          startIndex: this.state.startIndex + 6,
          endIndex: this.state.endIndex + 6
        });
      }
    }
  }

  handleClickPrev() {
    if (this.state.startIndex !== 0) {
      if (this.state.startIndex - 6 < 0) {
        this.setState({
          startIndex: 0,
          endIndex: 5
        });
      } else {
        this.setState({
          startIndex: this.state.startIndex - 6,
          endIndex: this.state.endIndex - 6
        });
      }
    }
  }

  render() {
    return(
      <div>
        <ReactImageMagnify {...{
          smallImage: {
            src: this.state.profile_image,
            height: 500,
            width: 500
          },
          largeImage: {
            src: this.state.profile_image,
            height: 1000,
            width: 1000
          },
          isHintEnabled: true,
          shouldHideHintAfterFirstActivation: false
        }} />
        <div id="gallery">
          <a href="javascript:;" id="prev" onClick={() => this.handleClickPrev()}>&lt;</a>
          {this.state.images.map((image, index) => {
            if (index >= this.state.startIndex && index <= this.state.endIndex) {
              return <GalleryImage index={index} s3_url={image.s3_url} changeProfileImage={this.changeProfileImage} />
            }
          })}
          <a href="javascript:;" id="next" onClick={() => this.handleClickNext()}>&gt;</a>
        </div>
      </div>
    )
  }

}