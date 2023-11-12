import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {  AiOutlineEyeInvisible , AiOutlineEye} from 'react-icons/ai';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

function RegisterArea() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const name = useRef();
  const username = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const [passwordShown, setPasswordShown] = useState(false);
  const [message, setMessage] = useState(null);

  const handleRegistration = (e) => {
    e.preventDefault();

    fetch("/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name.current.value,
        username: username.current.value,
        email: email.current.value,
        phone: phone.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message === "User created") {
          name.current.value = "";
          username.current.value = "";
          email.current.value = "";
          phone.current.value = "";
          password.current.value = "";
          setMessage("Account successfully created");
        } else if (res.errors) {
          let errors = Object.values(res.errors);
          setMessage(errors);
        }
      })
      .catch((err) =>{
        // console.log('object');
      });
  };

  return (
    <div className="register-form">
      {message &&
        (Array.isArray(message) ? (
          <div className="alert alert-danger" role="alert">
            <ul className="errors" style={{ marginBottom: 0 }}>
              {message.map((msg) => (
                <li key={msg} className="error">
                  {msg}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={`alert alert-success`} role="alert">
            {message}
          </div>
        ))}
      <h2>Register</h2>

      <form onSubmit={handleRegistration}>
        
        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
            className='' 
            placeholder='Name' 
            type="text" 
            name="name" 
            ref={name}
            required />
        </InputGroup>

        
        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
            className='' 
            placeholder='Username' 
            type="text" 
            name="userName" 
            ref={username}
            required />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
            className='' 
            placeholder='Enter Email' 
            type="email" 
            name="email" 
            ref={email}
            required />
        </InputGroup>

        {/* <div className="form-group">
          <input
            type="text"
            className="form-control"
            placeholder="Phone"
            ref={phone}
            required
          />
        </div> */}
        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
            className='' 
            placeholder='Phone' 
            type="number" 
            name="phone" 
            ref={phone}
            required />
        </InputGroup>

        <InputGroup className="mb-3 mt-3">
          <Form.Control aria-label="Amount (to the nearest dollar)" 
          className='' 
          placeholder='Enter Password' 
           type={visiblePassword ? "text" : "password"} 
          name="password" 
          ref={password}
          required />
          <InputGroup.Text 
            className=' border fs-3 bg-dark'
            onClick={() => setVisiblePassword(!visiblePassword)}
            style={{ cursor: 'pointer' }}
          >{
            visiblePassword ? (
              <AiOutlineEye style={{ fontSize: '20px' }} />
            ) : (
              <AiOutlineEyeInvisible style={{ fontSize: '20px' }} />
            )
          }
          </InputGroup.Text>
        </InputGroup>

        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-sm-6">
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="checkme"
                onChange={() => setPasswordShown(!passwordShown)}
              />
              <label className="form-check-label" htmlFor="checkme">
                Show password?
              </label>
            </div>
          </div>
        </div>

        <button type="submit">Register now</button>
      </form>

      <div className="important-text">
        <p>
          Already have an account? <Link to="/admin/login">Login now!</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterArea;
