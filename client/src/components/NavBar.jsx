import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <Navbar color="primary" dark>
      <NavbarBrand tag={Link} to="/" className="mr-auto">
        <img
          className="logo"
          src="http://loodibee.com/wp-content/uploads/nba-logo-transparent-300x300.png"
          alt="Logo"
          title="Logo"
        />
        Results App
      </NavbarBrand>
      <NavbarToggler
        onClick={() => setCollapsed(!collapsed)}
        className="mr-2"
      />
      <Collapse isOpen={!collapsed} navbar>
        <Nav navbar>
          <NavItem>
            <NavLink tag={Link} to="/scores">
              <i className="fab fa-dribbble" /> Results
            </NavLink>
            <NavLink tag={Link} to="/records">
              <i className="fas fa-medal" /> Records
            </NavLink>
            <NavLink tag={Link} to="/stats">
              <i className="far fa-chart-bar" /> Stats
            </NavLink>
            <NavLink tag={Link} to="/random">
              <i className="fas fa-random" /> Random Team
            </NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};

export default NavBar;
