import React from 'react';
import styles from './Upload.css';

export default class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: props.productId,
      name: `fileUpload,${props.productId}`
    };
    this.postImage = props.postImage;
  }

  render() {
    return (
      <div>
        <form id="uploadImage" encType="multipart/form-data" method="POST" action="/products/images" target="formDestination" >
          <input name={this.state.name} type="file"/>
          <input type="submit" value="submit" id="submit" />
        </form>
        <iframe className={ styles.iframe } name="formDestination"></iframe>
      </div>
    )
  }

}