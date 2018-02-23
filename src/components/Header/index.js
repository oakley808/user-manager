import React from 'react';
import PropTypes from 'prop-types';

import {
  Navbar,
  Nav,
  NavItem,
} from 'react-bootstrap';

import {
  Link,
} from 'react-router-dom';

export default function Header({ pathname }) {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand><span id="logo" role="img" aria-label="Bleep bloop">🤖</span> User Manager Prototype</Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem componentClass={Link} eventKey={1} href={`${process.env.PUBLIC_URL}/`} to={`${process.env.PUBLIC_URL}/`} active={pathname === `${process.env.PUBLIC_URL}/`}>Home</NavItem>
          <NavItem componentClass={Link} eventKey={2} href={`${process.env.PUBLIC_URL}/about`} to={`${process.env.PUBLIC_URL}/about`} active={pathname === `${process.env.PUBLIC_URL}/about`}>About</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


/**
 * Prop type validation
 */
Header.propTypes = {
  pathname: PropTypes.string,
};
