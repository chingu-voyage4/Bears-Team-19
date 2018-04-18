import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './HeaderNavbar.css';

class HeaderNavbar extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const loggedIn = this.props.auth && this.props.auth.user;
    return (
      <Navbar color="light" light expand="sm" className="navbar-expand-sm">
        <NavbarBrand tag={Link} to="/projects">
          <span className="Header-logo1"><i className="fas fa-code"></i></span>
          <span className="Header-name1">Project</span>
          <span className="Header-name2">Zone</span>          
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/projects">Browse</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/">About</NavLink>
            </NavItem>
            {loggedIn &&
              <NavItem>
                <NavLink tag={Link} to="/projects/create">New Project</NavLink>
              </NavItem>
            }
            {loggedIn &&
              <NavItem>
                <NavLink tag={Link} to="#">Sign Out</NavLink>
              </NavItem>
            }
            {!loggedIn &&
              <NavItem>
                <NavLink tag={Link} to="/login">Sign In</NavLink>
              </NavItem>
            }
            {!loggedIn &&
              <NavItem>
                <NavLink tag={Link} to="/register">Join Now</NavLink>
              </NavItem>
            }
          </Nav>
        </Collapse>
      </Navbar>
     );
  }
}

export default HeaderNavbar;
