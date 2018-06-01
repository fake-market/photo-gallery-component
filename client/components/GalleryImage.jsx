import React from 'react';

export default class GalleryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.s3_url
    }
    this.changeProfileImage = props.changeProfileImage;
  }

  render() {
    return(
      <img 
        class="gallery_image"
        src={this.state.image} 
        onClick={(e) => this.changeProfileImage(e)}
      />
    )
  }

}