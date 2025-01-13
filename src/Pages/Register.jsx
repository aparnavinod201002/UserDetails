import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Register() {
  const [register, setRegister] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const validate = () => {
    let isValid = true;
    const newErrors = { username: '', email: '', password: '' };

    if (!register.username) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!register.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailRegex.test(register.email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }

    if (!register.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (register.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;


    }

    setErrors(newErrors);
    return isValid;
  };

  const handleAdd = () => {
    const { username, email, password } = register;

    if (validate()) {
      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

      const newUser = { username, email, password };

      existingUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(existingUsers));

      setRegister({ username: '', email: '', password: '' });

      toast.success('User Added Successfully');
      navigate('/');
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          margin: 0,
          backgroundImage:
            'url("https://img.freepik.com/premium-vector/flat-isometric-3d-illustration-concept-creating-personal-data-registration_18660-4478.jpg?semt=ais_hybrid")',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '2px 4px 6px grey',
            backgroundColor: 'lightblue',
            
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              textAlign: 'center',
              color: 'white',
              backgroundColor: 'lightblue',
              marginBottom: '20px',
              textShadow: '2px 4px 6px black',
            }}
          >
            Register Now
          </h3>

          <input
            type="text"
            className="form-control"
            onChange={(e) => setRegister({ ...register, username: e.target.value })}
            style={{ margin: '7px' }}
            placeholder="Enter your Username"
            value={register.username}
          />
          {errors.username && <small style={{ color: 'red' }}>{errors.username}</small>}
          <br />

          <input
            type="text"
            className="form-control"
            onChange={(e) => setRegister({ ...register, email: e.target.value })}
            style={{ margin: '7px' }}
            placeholder="Enter your Email"
            value={register.email}
          />
          {errors.email && <small style={{ color: 'red' ,backgroundColor:"lightblue" }}>{errors.email}</small>}
          <br />

          <input
            type="password"
            className="form-control"
            onChange={(e) => setRegister({ ...register, password: e.target.value })}
            style={{ margin: '7px' }}
            placeholder="Enter your Password"
            value={register.password}
          />
          {errors.password && <small style={{ color: 'red' ,backgroundColor:"lightblue"}}>{errors.password}</small>}
          <br />

          <button className="btn btn-danger" onClick={handleAdd}>
            Register
          </button>
        </div>
      </div>
        <ToastContainer autoClose = {2000}
            position = 'top-center' theme='colored'/>
    </>
  );
}

export default Register;
