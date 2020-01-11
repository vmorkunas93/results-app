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
    <div>
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
                <i className="fab fa-dribbble" /> Rezultatai
              </NavLink>
              <NavLink tag={Link} to="/records">
                <i className="fas fa-medal" /> Rekordai
              </NavLink>
              <NavLink tag={Link} to="/stats">
                <i className="far fa-chart-bar" /> Statistika
              </NavLink>
              <NavLink tag={Link} to="/random">
                <i className="fas fa-random" /> Atsitiktinė komanda
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
