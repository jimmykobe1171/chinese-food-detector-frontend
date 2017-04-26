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
  
  upload(fileEntry) {
      // !! Assumes variable fileURL contains a valid URL to a text file on the device,
      const fileURL = fileEntry.toURL();
      console.log('file url:: ' + fileURL);

      const success = function (r) {
          console.log("Successful upload...");
          console.log("Code = " + r.responseCode);
          // displayFileData(fileEntry.fullPath + " (content uploaded to server)");
      }
      const fail = function (error) {
          alert("An error has occurred: Code = " + error.code);
      }
      const options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
      // options.fileName = 'test';
      options.mimeType = "image/jpeg";
      options.chunkedMode = false;

      const ft = new FileTransfer();
      const apiUrl = 'http://160.39.132.60:8888/api/upload-food-image/'      
      ft.upload(fileURL, encodeURI(apiUrl), success, fail, options);
  };

  uploadImage(imgUri) {
      console.log('image uri: ' + imgUri);
      this.getFileEntry(imgUri, this.upload);
  }

  getFileEntry(imgUri, successCallback) {
      window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
          console.log("got file: " + fileEntry.fullPath);
          successCallback(fileEntry);
      }, function () {
        // If don't get the FileEntry (which may happen when testing
        // on some emulators), copy to a new FileEntry.
          console.log("could not get file entry ");
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