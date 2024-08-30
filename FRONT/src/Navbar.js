import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <div>
      <header className="Header">
        <h2>Form Application</h2>
      </header>
      <nav className="navbar visible">
        <h1>F</h1>
        <div className="nav-items">
          <Link to="/form">Form</Link>
          <Link to="/data">Table</Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
