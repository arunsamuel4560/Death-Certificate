import React, { useState } from 'react';
import './VerifierLogin.css';
import axios from 'axios';
import {useHistory} from "react-router-dom"

function VerifierLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const Regdata = {
        VerifierName: username,
        Password:password,
      };
      console.log(Regdata)
      axios.post("http://localhost:4040/handle-login", {
        data : Regdata
        
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (!res.data){
          alert("user not found")
        }
        if (res.data.Password===password){
          alert("Login Successful")
          history.push("/home-page")
      window.location.reload()
        }
        else{
          alert("Wrong Password")
        }

        
        console.log(res);
      });
    }

  return (
    <div className="verifier-login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Verifier Login</h2>
        <label>
          <input type="text" placeholder='Username' value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          <input type="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default VerifierLogin;
