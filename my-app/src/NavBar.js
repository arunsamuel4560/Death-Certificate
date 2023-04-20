import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import {useHistory} from "react-router-dom"

function NavBar() {
  const history = useHistory();
  return (
    <div className="navbar">
      <h2>My App</h2>
      <ul>
        <li><a href="/policy-form">UserDeath</a></li>
        <li><a href="/verifier-login">VerifierLogin</a></li>
        <li><a href="/verifier-registration">VerifierRegistration</a></li>
        {/* <li><span onClick ={() => {history.push("/home-page")
      window.location.reload()}} >HomePage</span></li> */}
        {/* <li><href to="/verifier-login">Verifier Login</Link></li>
        <li><Link to="/verifier-registration">Verifier Registration</Link></li> */}
      </ul>
    </div>
  );
}

export default NavBar;
