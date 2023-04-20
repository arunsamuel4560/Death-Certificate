import React, { useState, useEffect } from 'react';
import PolicyForm from './PolicyForm';
// import './NavBar.js';
import axios from 'axios';
import SingleEntry from './SingleEntry';
import "./HomePage.css"
import download from 'downloadjs'

function PolicyTable() {
  const [policies, setPolicies] = useState([]);
  const [buttonStyle, setButtonStyle] = useState({
    color : "green"
  })
  function viewDoc (path){
    console.log(path)
    axios.get(`http://localhost:4040/downloadFile?filename=${path}`,{responseType: 'blob'})
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf'); //or any other extension
      document.body.appendChild(link);
      link.click();
  })
  .catch((error) => console.log(error));
    // .then(async (response) => {
      
    //   console.log(response)
    //   const blob = new File([response.data], "abc.pdf", { type: response.type })
    //   download(blob, 'abc.pdf', 'application/pdf')
    // })
    // .catch((error) => {
    //   console.error(error);
    // });
  }

  useEffect(() => {
    // Fetch data from API and update policies state
    axios.get('http://localhost:4040/get-policies')
      .then((response) => {
        console.log(response.data)
        setPolicies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if(policies.length){
  console.log(
    policies.length
  )
  return (
    <div className='table' style={{color : "red"}}>
      {/* <SingleEntry/> */}
      <div>huim  flweop</div>
    <table>
    {policies.map(data => {
      
     return (
      <tr>
        <td>{data.PolicyId}</td>
        <td>{data.PolicyAddress}</td>
        <td>{data.AadharNumber}</td>
        <td>{data.PolicyAmount}</td>
        <td>{data.PolicyName}</td>
        <td><button onClick={() => {
          viewDoc(data.DocumentAddress)
          
        }}>View</button></td>
       
        </tr>

        
     )
    })}
    
    </table>
    
    </div>
  );
  }

else{
  return(
    <div>loading</div>
  )
}}

export default PolicyTable;
