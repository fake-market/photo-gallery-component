import React from 'react';

export default class GalleryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.url
    }
    this.changeProfileImage = props.changeProfileImage;
    this.tempProfileImageOnHover = props.tempProfileImageOnHover;
    this.tempProfileImageOffHover = props.tempProfileImageOffHover;
  }

  render() {
    return(
      <img 
        class="gallery_image"
        src={this.state.image} 
        onMou
        onMouseOver={(e) => this.tempProfileImageOnHover(e)}
        onMouseLeave={(e) => this.tempProfileImageOffHover(e)}
        onClick={(e) => this.changeProfileImage(e)}
      />
    )
  }

}