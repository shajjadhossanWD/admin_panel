// src/SendDeleteRequest.js
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import NavbarHome from './NavbarHome';
import Footer from './FooterItem';
import swal from 'sweetalert';

const SendDeleteRequest = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    subject: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your logic here to send the delete request
    swal({
        text: "We have received your request. We will review it and delete your data within 24 hours.",
        icon: "success",
        button: "OK!",
        className: "modal_class_success",
      });
    console.log('Delete Request Submitted:', formData);
    // You can make an API call or perform any other necessary actions
  };

  return (
    <>
    <NavbarHome></NavbarHome>
    <Container className="mt-5 mb-5 ">
      <h2>Send Delete Request</h2>
      <p className='text-dark'>Send delete request to delete your information from KCCB Apps.</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter your phone number"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDetails">
          <Form.Label>Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Enter additional details"
            name="details"
            value={formData.details}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" className='mt-4 mb-5' type="submit">
          Send Request
        </Button>
      </Form>
    </Container>
    <Footer></Footer>
    </>
  );
};

export default SendDeleteRequest;
