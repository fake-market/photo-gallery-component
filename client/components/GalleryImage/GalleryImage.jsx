import React from 'react';

import styles from './GalleryImage.css';

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
      <img className={ styles.image }
        src={this.state.image} 
        onMou
        onMouseOver={(e) => this.tempProfileImageOnHover(e)}
        onMouseLeave={(e) => this.tempProfileImageOffHover(e)}
        onClick={(e) => this.changeProfileImage(e)}
      />
    )
  }

}