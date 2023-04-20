import React from 'react'

const SingleEntry = (data) => {
  console.log(data)
  return (
    <div style={{color : "red",fontSize:"20px",borderColor : "black"}}>
      <tr>
        <td>{data.PolicyId}</td>
        <td>{data.PolicyAddress}</td>
        <td>{data.AadharNumber}</td>
        <td>{data.PolicyAmount}</td>
        <td>{data.PolicyName}</td>
        </tr>
    </div>
  )
}

export default SingleEntry