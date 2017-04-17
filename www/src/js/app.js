import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Nav,Navbar, NavItem } from 'react-bootstrap';

// require('react-fastclick');

import HomePage from './pages/home';
import AboutPage from './pages/about';


render(
    <Router>
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <div>React-Bootstrap</div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem eventKey={1} ><Link to="/">Home</Link></NavItem>
              <NavItem eventKey={2} ><Link to="/about">About</Link></NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={HomePage}/>
        <Route path="/about" component={AboutPage}/>
      </div>
    </Router>,
    document.getElementById('app')
);
