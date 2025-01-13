import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function EditUserData({ item }) {
  const [update, setUpdate] = useState({
    email: item.email,
    password: item.password,
    username: item.username,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
   
    setUpdate({
      email: item.email,
      password: item.password,
      username: item.username,
    });
    setShow(true);
  };

  const updateData = () => {
 
    const result = localStorage.getItem('users');
    const data = result ? JSON.parse(result) : [];

   
    const updatedData = data.map((user) =>
      user.email === item.email && user.password === item.password
        ? { ...user, ...update } 
        : user
    );

    localStorage.setItem('users', JSON.stringify(updatedData));

   
    toast.success('User updated successfully');
    setUpdate({ email: '', password: '', username: '' }); 
    handleClose(); 
    
  };

  return (
    <>
      <i
        className="fa-solid fa-pen-to-square"
        style={{ color: 'red', margin: '5px', cursor: 'pointer' }}
        onClick={handleShow}
      ></i>

      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel controlId="floatingUsername" label="Username" className="mb-3">
            <Form.Control
              type="text"
              value={update.username} 
              onChange={(e) =>
                setUpdate((prev) => ({ ...prev, username: e.target.value }))
              } 
              placeholder="Enter username"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingEmail" label="Email" className="mb-3">
            <Form.Control
              type="email"
              value={update.email} 
              onChange={(e) =>
                setUpdate((prev) => ({ ...prev, email: e.target.value }))
              } 
              placeholder="Enter email"
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
            <Form.Control
              type="password"
              value={update.password} 
              onChange={(e) =>
                setUpdate((prev) => ({ ...prev, password: e.target.value }))
              } 
              placeholder="Enter password"
            />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateData}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
       <ToastContainer autoClose = {2000}
            position = 'top-center' theme='colored'/>
    </>
  );
}

export default EditUserData;
