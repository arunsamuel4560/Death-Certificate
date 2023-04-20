import React, { useState } from 'react';
import './RegistrationForm.css';
import axios from 'axios';

function RegistrationForm() {
  const [verifierName, setVerifierName] = useState('');
  const [verifierCompany, setVerifierCompany] = useState('');
  const [verifierDesignation, setVerifierDesignation] = useState('');
  const [verifierAddress, setVerifierAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleVerifierNameChange = (event) => {
    setVerifierName(event.target.value);
  };

  const handleVerifierCompanyChange = (event) => {
    setVerifierCompany(event.target.value);
  };

  const handleVerifierDesignationChange = (event) => {
    setVerifierDesignation(event.target.value);
  };

  const handleVerifierAddressChange = (event) => {
    setVerifierAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const Regdata = {
        VerifierName: verifierName,
        VerifierCompany: verifierCompany,
        VerifierDesignation: verifierDesignation,
        VerifierAccountAddress:verifierAddress,
        Password:password,
      };
      console.log(Regdata)
      axios.post("http://localhost:4040/submitForm", {
        data : Regdata
        
      },{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        console.log(response);
        if(response.data){
          alert(" New User created " + response.data.VerifierName )
        }
      });
    }
    
    
    
      

  return (
    <div className="registration-form">
      <form onSubmit={handleSubmit}>
        <h2>Verifier Registration</h2>
        <div className="form-group">
          <label htmlFor="verifierName"><span className="required"></span></label>
          <input type="text" placeholder='Verifier Name' id="verifierName" name="verifierName" value={verifierName} onChange={handleVerifierNameChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="verifierCompany"><span className="required"></span></label>
          <input type="text" placeholder='Verifier Company' id="verifierCompany" name="verifierCompany" value={verifierCompany} onChange={handleVerifierCompanyChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="verifierDesignation"><span className="required"></span></label>
          <input type="text" placeholder='Verifier Designation' id="verifierDesignation" name="verifierDesignation" value={verifierDesignation} onChange={handleVerifierDesignationChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="verifierAddress"><span className="required"></span></label>
          <input type="text" placeholder='Verifier Account Address' id="verifierAddress" name="verifierAddress" value={verifierAddress} onChange={handleVerifierAddressChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password"><span className="required"></span></label>
          <input type="password" placeholder='Password' id="password" name="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
