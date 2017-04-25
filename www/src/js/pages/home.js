import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {goToAbout: false};
  }

  // componentDidMount() {

  // }

  // componentWillUnmount() {

  // }

  setOptions(srcType) {
      var options = {
          // Some common settings are 20, 50, and 100
          quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: srcType,
          encodingType: Camera.EncodingType.JPEG,
          mediaType: Camera.MediaType.PICTURE,
          allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
      }
      return options;
  }
  openFilePicker() {
      const srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
      const options = {
          // // Some common settings are 20, 50, and 100
          // quality: 50,
          destinationType: Camera.DestinationType.FILE_URI,
          // In this app, dynamically set the picture source, Camera or photo gallery
          sourceType: srcType,
          // encodingType: Camera.EncodingType.JPEG,
          // mediaType: Camera.MediaType.PICTURE,
          // allowEdit: true,
          correctOrientation: true  //Corrects Android orientation quirks
      }
      navigator.camera.getPicture(function cameraSuccess(imageUri) {

          alert(imageUri);

      }, function cameraError(error) {
          console.debug("Unable to obtain picture: " + error, "app");
      }, options);
  }

  chooseImage() {
      this.openFilePicker();
  }

  render() {
    if (this.state.goToAbout) {
      return <Redirect to="/result" />;
    }
    const wellStyles = {margin: "auto", width: "40%"};
    return (
      <div className='homepage'>
        <div style={wellStyles}>
          <Button bsStyle="primary" bsSize="large" onClick={this.chooseImage.bind(this)}>Choose Image</Button>
        </div>
      </div>
    );
  }
}

export default HomePage;