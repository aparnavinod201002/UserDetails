import React, { useEffect, useState } from 'react'

import EditUserData from '../Components/EditUserData';
import BlockDetails from '../Components/BlockDetails';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function UserList() {
const [datas,setDatas]=useState()

    const getDetails = () => {
        const result = localStorage.getItem('users');
        const data = result ? JSON.parse(result) :[]
        setDatas(data);
      };
      const deletes = (email, password) => {

        const result = localStorage.getItem('users');
        const data = result ? JSON.parse(result) : [];
        const updatedData = data.filter(
          (item) => !(item.email === email && item.password === password)
        );
      
       
        localStorage.setItem('users', JSON.stringify(updatedData));
      
      
        toast.success('User deleted successfully');
        getDetails(); 
      };
      
useEffect(()=>{
    getDetails()
})
  return (
    <>
    <button className='btn btn-danger m-3' ><Link to={'/'} style={{textDecoration:"none", backgroundColor:"transparent",color:"white"}}>Logout</Link></button>
    <div  style={{display: 'flex',
    justifyContent: 'center',
   
   
    margin: 0, }} >

<table style={{ width: '80%', borderCollapse: 'collapse', marginTop: '40px',boxShadow:"2px 4px 6px grey" }}>
      <thead>
        <tr>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>#</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Username</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Password</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Actions</th>
          <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>Block/UnBlock</th>
        </tr>
      </thead>
     { datas?.length>0?datas.map((item,index)=>(<tbody>
        <tr>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{index+1}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.username}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.email}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.password}</td>
          <td style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'center' }}>
           
              <i className="fa-solid fa-trash" style={{color:"red",margin:"5px",cursor: 'pointer' }}
                            onClick={() => deletes(item.email, item.password)} ></i> 
            
          
         <EditUserData item={item}/>
              </td>
              <td>
           <BlockDetails item={item}/>

          </td>
          
        </tr>
      </tbody>)):<p>No Users Found</p>}
    </table>
        </div>  
        <ToastContainer autoClose = {2000}
      position = 'top-center' theme='colored'/>
    </>
  )
}

export default UserList




