import Form from "react-bootstrap/Form";
import  { useState } from "react";
import Button from "react-bootstrap/Button";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { Field, useFormik } from "formik";
import { FieldContainer,FormError, FieldError , FormSuccess} from "./commun";

import { Alert } from "bootstrap";
const validationSchema = yup.object({
  Emailadress: yup.string(),
  password: yup.string().required(),
});

export default function Login (props) {
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    setError(null);
    const response = await axios
      .post("http://localhost:4000/users/login", values)
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
      });

    if (response) {
      alert("Welcome back in. Authenticating...");
    }
  };

  const formik = useFormik({
    initialValues: { Emailadress: "", password: "" },
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  
    return (
        <div className="auth-wrapper">
        <div className="auth-inner">
                <h3>Login</h3>
                <FormError>{error ? error : ""}</FormError>
                 <Form 
               onSubmit={formik.handleSubmit}
                >
                <Form.Group size="lg" controlId="email">
                <FieldContainer>

                <div className="form-group">
                <Form.Label>Email address</Form.Label>
                    <Form.Control
  
                       autoFocus
                       name="Emailadress"
                       type="email"
  
                      value={formik.values.Emailadress}
  
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
  
                    /> 
                      {
            <FieldError>
              {formik.touched.email && formik.errors.email
                ? formik.errors.email
                : ""}
            </FieldError>
          }</div>
        </FieldContainer>
                    
  
               
                </Form.Group>
                <FieldContainer>
                <div className="form-group">
               <Form.Group size="lg" controlId="password">
  
            <Form.Label>Password</Form.Label>
            <Form.Control
               name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
             onBlur={formik.handleBlur}
  
            />
  
          </Form.Group>
           
            {
            <FieldError>
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ""}
            </FieldError>
          } </div>
        </FieldContainer>
                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>
                <Button  size="lg" type="submit" 
                 disabled={!formik.isValid}
                 >Submit </Button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
                </Form>
</div>
</div>
        );

}