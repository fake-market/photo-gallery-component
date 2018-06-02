import React from 'react';
import ReactImageMagnify from 'react-image-magnify'
import axios from 'axios';

import GalleryImage from './GalleryImage.jsx';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productId: 1,
      images: [],
      profileImage: '',
      tempProfileImage: null,
      startIndex: 0,
      endIndex: 5
    };
    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.setProfileImage = this.setProfileImage.bind(this);
    this.changeProfileImage = this.changeProfileImage.bind(this);
    this.tempProfileImageOffHover = this.tempProfileImageOffHover.bind(this);
    this.tempProfileImageOnHover = this.tempProfileImageOnHover.bind(this);
  }

  componentDidMount() {
    this.fetchImages();
  }

  fetchImages() {
    axios.get('/products/images', {
      params: {
        productId: this.state.productId
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
          profileImage: image.s3_url
        })
      }
    })
  }

  changeProfileImage(e) {
    this.setState({
      profileImage: e.target.src,
      tempProfileImage: e.target.src
    });
  }

  tempProfileImageOnHover(e) {
    this.setState({
      tempProfileImage: this.state.profileImage,
      profileImage: e.target.src
    })
  }

  tempProfileImageOffHover(e) {
    this.setState({
      profileImage: this.state.tempProfileImage,
      tempProfileImage: null
    })
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
            src: this.state.profileImage,
            height: 500,
            width: 500
          },
          largeImage: {
            src: this.state.profileImage,
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
              return <GalleryImage index={index} url={image.s3_url} changeProfileImage={this.changeProfileImage} tempProfileImageOnHover={this.tempProfileImageOnHover} tempProfileImageOffHover={this.tempProfileImageOffHover} />
            }
          })}
          <a href="javascript:;" id="next" onClick={() => this.handleClickNext()}>&gt;</a>
        </div>
      </div>
    )
  }

}