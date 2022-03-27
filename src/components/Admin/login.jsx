import Form from "react-bootstrap/Form";
import  { useState } from "react";
import Button from "react-bootstrap/Button";
import React from "react";
//import './login.css';
import { Alert } from "bootstrap";
export default function Login (){
   
    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");
  
    function validateForm() {
        
      return email.length > 0 &&  password.length > 8
      
  
    }
  
    function handleSubmit(event) {
  
      event.preventDefault();
  
    }
  
    return (
        <div className="auth-wrapper">
        <div className="auth-inner">
        <form>
                <h3>Login</h3>
                <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                <div className="form-group">
                <Form.Label>Email address</Form.Label>
                    <Form.Control
  
                       autoFocus
  
                       type="email"
  
                        value={email}
  
                     onChange={(e) => setEmail(e.target.value)}
  
                    />
                    
  
                </div>
                </Form.Group>
                <div className="form-group">
               <Form.Group size="lg" controlId="password">
  
            <Form.Label>Password</Form.Label>
            <Form.Control
  
              type="password"
  
              value={password}
  
              onChange={(e) => setPassword(e.target.value)}
  
            />
  
          </Form.Group>
            </div> 
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <Button block size="lg" type="submit"  disabled={!validateForm()}>Submit
                
                </Button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                </Form>
            </form>
</div>
</div>
        );

}