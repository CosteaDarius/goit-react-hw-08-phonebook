import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navigation.css';

const Navigation = () => (
  <nav className="nav">
    <Link to="/register">Register</Link>
    <Link to="/login">Login</Link>
    <Link to="/contacts">Contacts</Link>
  </nav>
);

export default Navigation;
