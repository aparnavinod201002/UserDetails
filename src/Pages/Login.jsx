import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    const { email, password } = login;

    if (!email || !password) {
      toast.danger('Please Fill Missing Fields');
    } else {
     
      const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

      
      const user = storedUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (user) {
        
        sessionStorage.setItem('username', user.username);
        sessionStorage.setItem('email', user.email);

     
        navigate('/userlist');

     
        setLogin({ email: '', password: '' });

        toast.success('Login Successful!');
      } else {
       
       toast('Invalid Email or Password. Please try again.');
      }
    }
  };

  return (
    <>
     

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
         
         
          marginTop:"100px",
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '40px', 
            boxShadow: '2px 4px 6px grey',
            backgroundColor: 'lightblue',
            maxWidth: '400px',
            textAlign: 'center',
          }}
        >
             <h1
        style={{
          textAlign: 'center',
          color:"white",
          backgroundColor: 'lightblue',
          marginTop: '20px', 
          marginBottom: '10px',
          textShadow: '2px 4px 6px black',
        }}
      >
        Login Now
      </h1>
          <input
            type="text"
            className="form-control"
            style={{ margin: '7px' }}
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            placeholder="Enter your email"
          />
          <input
            type="password"
            className="form-control"
            style={{ margin: '7px' }}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            placeholder="Enter your Password"
          />
          <button className="btn btn-danger m-4" onClick={handleLogin}>
            Login
          </button>
          <p
            style={{
              color: 'white',
              marginTop: '5px',
              fontWeight: 'bolder',
              backgroundColor: 'lightblue',
            }}
          >
            Already Have an Account? Click here to  
            <Link
              to={'/register'}
              style={{ textDecoration: 'none', color: 'green', backgroundColor: 'lightblue' }}
            >
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer autoClose = {2000}
      position = 'top-center' theme='colored'/>
    </>
  );
}

export default Login;
