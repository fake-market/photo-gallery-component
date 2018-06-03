import React from 'react';

import styles from './GalleryImage.css';

export default class GalleryImage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      image: props.url,
      selectedImage: props.selectedImage,
      selected: false
    }
    this.changeProfileImage = props.changeProfileImage;
    this.tempProfileImageOnHover = props.tempProfileImageOnHover;
    this.tempProfileImageOffHover = props.tempProfileImageOffHover;
  }

  componentDidMount() {
    this.setState({
      selected: this.state.image === this.state.selectedImage
    })
  }

  render() {
    return(
      <img className={ styles.image }
        src={this.state.image} 
        value={this.state.selected}
        onMouseOver={(e) => this.tempProfileImageOnHover(e)}
        onMouseLeave={(e) => this.tempProfileImageOffHover(e)}
        onClick={(e) => this.changeProfileImage(e)}
      />
    )
  }

}