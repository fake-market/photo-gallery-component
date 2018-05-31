import React from 'react';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return(
      <div>
        <img id="profile_image" src="https://s3-us-west-1.amazonaws.com/hrla22-ebay-fe/drone1.jpg" height="300" width="300" />
      </div>
    )
  }

}