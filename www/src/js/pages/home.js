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

  chooseImage() {
    this.setState({goToAbout: true});
  }

  render() {
    if (this.state.goToAbout) {
      return <Redirect to="/about" />;
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