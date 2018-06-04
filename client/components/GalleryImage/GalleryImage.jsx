import React from 'react';

import styles from './GalleryImage.css';

export default class GalleryImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: props.url,
      isMatch: props.isMatch,
      selectedImage: props.selectedImage,
      selected: false
    }
    this.selectThumbnail = this.selectThumbnail.bind(this);
    this.changeProfileImage = props.changeProfileImage;
    this.tempProfileImageOnHover = props.tempProfileImageOnHover;
    this.tempProfileImageOffHover = props.tempProfileImageOffHover;
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.isMatch !== this.state.isMatch) {
      this.setState({
        isMatch: nextProps.isMatch
      })
    }
  }

  selectThumbnail(e) {
    let src = e.target.src;
    this.setState({
      selected: true
    }, () => this.changeProfileImage(src))
  }

  render() {
    return(
      <td>
        <img className={ styles.image }
          src={this.state.image} 
          value={this.state.isMatch}
          onMouseOver={(e) => this.tempProfileImageOnHover(e)}
          onMouseLeave={(e) => this.tempProfileImageOffHover(e)}
          onClick={(e) => this.selectThumbnail(e)}
        />
      </td>
    )
  }

}