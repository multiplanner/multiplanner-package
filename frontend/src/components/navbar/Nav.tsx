import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";
import WURLogo from "../../assets/images/WUR_W_Logo.svg"
import Button from '../button/Button';

function Nav() {

const logOut = () => {

}

  return (
    <div className="navbar">
      <Link to="/">
        <span className="branding"><p className="branding-name">Jitai</p><img className="navbar-logo" src={WURLogo} alt="WUR-logo"/></span>
      </Link>
      <div className="nav-links">
        <Link className="nav-link" to="/areas">
          <p>Gebieden</p>
        </Link>
        <Link className="nav-link" to="/locations">
          <p>Locaties</p>
        </Link>
        <Link className="nav-link" to="/franchises">
          <p>Franchises</p>
        </Link>
        <Link className="nav-link" to="/goals">
          <p>Doelstellingen</p>
        </Link>        
        <Link className="nav-link" to="/users">
          <p>Gebruikers</p>
        </Link>
        {/* <Link className="nav-link" to="/interventions">
          <p>Interventies</p>
        </Link> */}
      </div>
      <Button title="Log uit" disabled={false} onClick={logOut} />
    </div>
  );
}

export default Nav;
