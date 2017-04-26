import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Spinner from'react-spinkit';

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {loading: false};
  }

  // componentDidMount() {

  // }

  // componentWillUnmount() {

  // }
  
  upload(fileEntry) {
      // !! Assumes variable fileURL contains a valid URL to a text file on the device,
      const fileURL = fileEntry.toURL();
      console.log('file url:: ' + fileURL);

      const success = function (r) {
          console.log("Successful upload...");
          console.log("Code = " + r.responseCode);
          // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
          this.setState({loading: false});
      }
      const fail = function (error) {
          alert("An error has occurred: Code = " + error.code);
          this.setState({loading: false});
      }
      const options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      // options.fileName = 'test';
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;

      const ft = new FileTransfer();
      const apiUrl = 'http://160.39.132.60:8888/api/upload-food-image/';
      this.setState({loading: true});
      ft.upload(fileURL, encodeURI(apiUrl), success.bind(this), fail.bind(this), options);
  };

  uploadImage(imgUri) {
      console.log('image uri: ' + imgUri);
      this.getFileEntry(imgUri, this.upload.bind(this));
  }

  getFileEntry(imgUri, successCallback) {
      window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
          console.log("got file: " + fileEntry.fullPath);
          successCallback(fileEntry);
      }, function () {
        // If don't get the FileEntry (which may happen when testing
        // on some emulators), copy to a new FileEntry.
          alert("could not get file entry ");
      });
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
          this.uploadImage(imageUri);
      }.bind(this), function cameraError(error) {
          alert("Unable to obtain picture: " + error, "app");
      }, options);
  }

  chooseImage() {
      this.openFilePicker();
  }

  getLoadingIndicator() {
    const styles = {
      position: 'fixed',
      left: '42%',
      top: '50%',
      zIndex: '9999',
    };

    const indicator = (
      <div style={styles}>
        <Spinner spinnerName='three-bounce' />
      </div>
        );
    return indicator;
  }

  render() {
    let loadingIndicator = null;
    if (this.state.loading) {
      loadingIndicator = this.getLoadingIndicator();
    }
    // loadingIndicator = this.getLoadingIndicator();
    const wellStyles = {margin: "auto", width: "40%"};
    return (
      <div className='homepage'>
        {loadingIndicator}
        <div style={wellStyles}>
          <Button bsStyle="primary" bsSize="large" onClick={this.chooseImage.bind(this)}>Choose Image</Button>
        </div>
      </div>
    );
  }
}

export default HomePage;