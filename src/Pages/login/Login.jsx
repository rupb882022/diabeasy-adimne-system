import React, { useState,useLayoutEffect } from 'react'
import { Container, Row, Col, Form, Button, InputGroup, Alert } from 'react-bootstrap';
import './Login.css';
import logo from '../../logo.png'


export default function Login(props) {
  const { setUserIsLogIn } = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);
  const [alert, setAlert] = useState();

  const checkUser = async() => {
    if (email && password) {
      setValidated(false)
      console.log("email", email);
      console.log("password", password);
     if( password === '123456'&&email==='tal.f@shoesonline.co.il')
     {
     await setItemLocalStorage();
      setUserIsLogIn(true) 
     } else{
      setAlert({
        variant: 'warning',
        body: 'Email or Password are wrong'
      });
     }
  
    } else {
      setValidated(true)
      setAlert({
        variant: 'danger',
        body: 'Email and Password are required'
      })
    }
  }

const setItemLocalStorage=()=>{
  localStorage.setItem("userDetails", JSON.stringify({"email":email,"password":password}));
}
const getItemLocalStorage=()=>{
  let userDetails=localStorage.getItem("userDetails");
  userDetails&&setUserIsLogIn(true);
}
useLayoutEffect(()=>{
  getItemLocalStorage();
},[])
  return (<>       
   <img className='Loginimg' src={logo} alt="" />
    <Container>
      <Row>
        <Col>
          <Form className='formContainer' validated={validated}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                  value={email}
                  placeholder="Email"
                  aria-describedby="basic-addon1"
                  type="text"
                  onInput={(e) => { setEmail(e.target.value) }}
                  required
                />
              </InputGroup>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Text className='eyeIcon' onClick={()=>{setShowPassword(!showPassword)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
                </InputGroup.Text>
                <Form.Control
                  onInput={(e) => { setPassword(e.target.value) }}
                  type={showPassword?'text':"password"}
                  placeholder="Password"
                  value={password}
                  required />
              </InputGroup>
            </Form.Group>
            <Row>
              <Col>
                <Button className='LogInButton' onClick={() => { checkUser(); }} variant="primary">
                  Log in
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          {alert &&
            <Alert className='alert' variant={alert && alert.variant ? alert.variant : 'primary'}>
              {alert && alert.body &&
                <p className='alertBody'>
                  {alert.body}
                </p>}
            </Alert>}
        </Col>
      </Row>
    </Container>
    </>)
}
