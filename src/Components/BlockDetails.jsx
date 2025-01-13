import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function BlockDetails({ item, refreshData }) {
  const [show, setShow] = useState(false); 
  const [isBlocked, setIsBlocked] = useState(item.isBlocked || false); 

  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  
  const blockDetails = () => {
    
    const result = localStorage.getItem('users');
    const data = result ? JSON.parse(result) : [];

  
    const updatedData = data.map((user) =>
      user.email === item.email && user.password === item.password
        ? { ...user, isBlocked: !isBlocked } : user
    );

  
    localStorage.setItem('users', JSON.stringify(updatedData));

    
    setIsBlocked(!isBlocked);
    toast.success(isBlocked ? 'User Unblocked Successfully' : 'User Blocked Successfully');
    handleClose();
    refreshData(); 
  };

  return (
    <>
    
      <p style={{ color: isBlocked ? 'red' : 'green', fontWeight: 'bold', margin: '10px 0' }}>
        {isBlocked ? 'User is Blocked' : 'User is Unblocked'}
      </p>

      
      <button className="btn btn-success" style={{ margin: '4px' }} onClick={handleShow}>
        {isBlocked ? 'Unblock User' : 'Block User'}
      </button>

     
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>{isBlocked ? 'Unblock User' : 'Block User'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to {isBlocked ? 'unblock' : 'block'} this user?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={blockDetails}>
            Yes, {isBlocked ? 'Unblock' : 'Block'} User
          </Button>
        </Modal.Footer>
      </Modal>
        <ToastContainer autoClose = {2000}
                  position = 'top-center' theme='colored'/>
    </>
  );
}

export default BlockDetails;
