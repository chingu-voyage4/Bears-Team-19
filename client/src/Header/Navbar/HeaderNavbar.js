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
import logo from './logo.svg';
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
    return (
      <Navbar color="faded" light expand="sm" className="navbar-expand-sm">
        <NavbarBrand tag={Link} to="/">
          <img src={logo} className="Header-logo" alt="logo" />
          Projects
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="#">About</NavLink>
            </NavItem>
            {this.props.user &&
              <NavItem>
                <NavLink tag={Link} to="/projects/create">New Project</NavLink>
              </NavItem>
            }
            {this.props.user &&
              <NavItem>
                <NavLink tag={Link} to="/logout">Sign Out</NavLink>
              </NavItem>
            }
            {!this.props.user &&
              <NavItem>
                <NavLink tag={Link} to="/login">Sign In</NavLink>
              </NavItem>
            }
            {!this.props.user &&
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
