import React, { useState } from 'react';
import './PolicyForm.css';
import './NavBar.js';
import axios from 'axios';
import { set } from 'mongoose';


function PolicyForm() {
  const [policyId, setPolicyId] = useState('');
  const [policyName, setPolicyName] = useState('');
  const [aadharNumber, setaadharNumber] = useState('');
  const [policyAddress, setPolicyAddress] = useState('');
  const [policyAmount, setPolicyAmount] = useState('');
  const [deathCertificate, setDeathCertificate] = useState(null);
  const [documentAddress, setDocumentAddress] = useState("");
  
  const onChangeDocument = e => {
    
    setDeathCertificate(e.target.files[0]);
    
    
  };
    

  const handlePolicyIdChange = (event) => {
    setPolicyId(event.target.value);
  };

  const handlePolicyNameChange = (event) => {
    setPolicyName(event.target.value);
  };

  const handleaadharNumberChange = (event) => {
    setaadharNumber(event.target.value);
  };

  const handlePolicyAddressChange = (event) => {
    setPolicyAddress(event.target.value);
  };

  const handlePolicyAmountChange = (event) => {
    setPolicyAmount(event.target.value);
  };

  const handleUploadCertificateClick = () => {
    // redirect to the file system
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    
    // const response = await axios.post('http://localhost:4040/submitForm'
    // , {data : policy})
    // console.log(policy)
    
    if(!deathCertificate)
    {
      alert("please select death certificate")
    }
    else{
      
    
      
      console.log('DeathCertificate: ',deathCertificate);
      let formdata = new FormData();
      formdata.append("MyFile",deathCertificate);
      // console.log("active",formdata);
      for(var pair of formdata.entries()) {
        console.log(pair[0]+', '+pair[1]);
      }
    axios.post("http://localhost:4040/api/uploadFile",formdata,
  {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    
    .then((response) => {
      console.log(response.data);
      setDocumentAddress(response.data.path)
      const policy = {
        policyId: policyId,
        policyName: policyName,
        aadharNumber: aadharNumber,
        policyAddress: policyAddress,
        policyAmount: policyAmount,
        documentAddress : response.data.path
      };
      axios.post("http://localhost:4040/Regform", {
      data : policy
      
    },{
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
    });
     
    });
    
    setPolicyId('');
    setPolicyName('');
    setaadharNumber('');
    setPolicyAddress('');
    setPolicyAmount('');
  }
  };
 
  return (
    
      <form onSubmit={handleSubmit} className="UserDeath"> 
        <label>
          <input type="number" placeholder='Policy ID' value={policyId} onChange={handlePolicyIdChange} />
        </label>
        <br />
        <label>
          <input type="text" placeholder='Policy address' value={policyAddress} onChange={handlePolicyAddressChange} />
        </label>
        <br />
        <label>
          <input type="number" placeholder='Aadhar Number' value={aadharNumber} onChange={handleaadharNumberChange} />
        </label>
        <br />
        <label>
          <input type="number" placeholder='Policy amount' value={policyAmount} onChange={handlePolicyAmountChange} />
        </label>
        <br />
        <label>
          <input type="text" placeholder='Policy Holder name' value={policyName} onChange={handlePolicyNameChange} />
        </label>
        <br />
        <label for="avatar">Choose a profile picture:</label>
        <input type="file"
       id="MyFile" name="MyFile"
       onChange={onChangeDocument} />
          
        
        <br />
        <button type="submit">Submit</button>
      </form>
   
  );
}

export default PolicyForm;
