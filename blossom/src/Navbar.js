import React from 'react';
import './Navbar.css'; // Import CSS file for styling

function Navbar() {
  return (
    <nav className="navbar">
      <div className="brand">Florist</div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">Florist</a></li>
        <li><a href="#">Customer</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;
