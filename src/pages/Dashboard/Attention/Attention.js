import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import swal from 'sweetalert';

const Attention = () => {
  const [title, setTitle] = useState('');
  const [messages, setMessages] = useState([{ title: '' }]);

  useEffect(() => {
    fetch('https://kccb.kvillagebd.com/api/v1/attention/get')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setTitle(data[0].title);
          setMessages(data[0].message);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === 'title') setTitle(value);
    if (name === 'message') {
      const updatedMessages = [...messages];
      updatedMessages[index] = { title: value };
      setMessages(updatedMessages);
    }
  };

  const handleAddMessage = () => {
    setMessages([...messages, { title: '' }]);
  };

  const handleRemoveMessage = (index) => {
    // Remove the message field at the specified index
    const updatedMessages = [...messages];
    updatedMessages.splice(index, 1);
    setMessages(updatedMessages);
  };

  const handleSave = () => {
    fetch('https://kccb.kvillagebd.com/api/v1/attention/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, message: messages }),
    })
      .then((response) => response.json())
      .then((data) => 
        swal({
          text: data.message,
          icon: "success",
          button: "OK!",
          className: "modal_class_success",
        })
      )
      .catch((error) => console.error('Error saving data:', error));
  };

  return (

    <div className="adminBody">
      <h5 className="text-white text-start">ATTENTION MESSAGE</h5>
    <div className="adminCard p-5">
    <Form>
      
      {/* <Form.Group controlId="formTitle">
        <Form.Label className='text-white mt-2'>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={(e) => handleInputChange(e)}
        />
      </Form.Group> */}

      {messages.map((message, index) => (
        <Form.Group key={index} controlId={`formMessage${index}`}>
          <Form.Label className='text-white mt-2 d-flex justify-content-between'>
            Message {index + 1}
            <p>
            <span className='closeMessageBtn' onClick={() => handleRemoveMessage(index)}>
              X
            </span>
            </p>
            
            </Form.Label>
         
          <Form.Control
            type="text"
            placeholder={`Enter message ${index + 1}`}
            name="message"
            value={message.title}
            onChange={(e) => handleInputChange(e, index)}
          />
          
        </Form.Group>
      ))}

      <Button variant="secondary" className='mt-2'  onClick={handleAddMessage}>
        Add More
      </Button>

      <br/>

  
     <p className='d-flex align-items-center justify-content-center'>
     <Button variant="primary" className='mx-auto w-50 mt-3' onClick={handleSave}>
        Submit Message
      </Button>
     </p>
      
    </Form>
    </div>
  </div>
  );
};

export default Attention;
