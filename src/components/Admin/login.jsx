import Form from "react-bootstrap/Form";
import { Navigate , Route , useNavigate} from "react-router";
import  { useState } from "react";
import Button from "react-bootstrap/Button";
import React from "react";
import * as yup from "yup";
import axios from "axios";
import { Field, useFormik } from "formik";
import { FieldContainer,FormError, FieldError , FormSuccess} from "./commun";
import Swal from 'sweetalert2'
import MapJ from '../../map/Mapjuge';
import Map from '../../map/MapAdmin';
import MapA from '../../map/MapAvocat';



import { Alert } from "bootstrap";
import { Result } from "antd";
const validationSchema = yup.object({
  Emailaddress: yup.string(),
  Password: yup.string().required(),
});

export default function Login (props) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (values) => {
    const response = await axios
      .post("http://localhost:4000/users/login", values)
       .then(result => {
        //navigate('/Map')
        //navigate('/MapJ')
         navigate('/MapA')


     
       })
      .catch((err) => {
       // if (err && err.response)  //setError(err.response.data.message);
       Swal.fire({
        icon: 'Error',
        text: 'Compte introuvable',
      });
      });

    //  if (response && response.data) {
      /*  setError(null);
        setSuccess(response.data.message);
        formik.resetForm();*/
        //alert("welcome");
      //  return //(<Navigate to="/Map" />)
      // ( <Route path="/" exact component={Map} /> )
        //<Route path="*" element={<Navigate to ="/Map" />}/>
    // 
      //}
  };

  const formik = useFormik({
    initialValues: { Emailaddress: "", Password: "" },
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
                  
                <Form.Group size="lg" controlId="Emailaddress">
                <FieldContainer>

                <div className="form-group">
                <Form.Label>Email address</Form.Label>
                    <Form.Control
  
                       autoFocus
                       name="Emailaddress"
                       type="email"
  
                      value={formik.values.Emailaddress}
  
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
  
                    /> 
                      {
            <FieldError>
              {formik.touched.Emailaddress && formik.errors.Emailaddress
                ? formik.errors.Emailaddress
                : ""}
            </FieldError>
          }</div>
        </FieldContainer>
                    
  
               
                </Form.Group>
                <FieldContainer>
                <div className="form-group">
               <Form.Group size="lg" controlId="Password">
  
            <Form.Label>Password</Form.Label>
            <Form.Control
               name="Password"
              type="Password"
              value={formik.values.Password}
              onChange={formik.handleChange}
             onBlur={formik.handleBlur}
  
            />
  
          </Form.Group>
           
            {
            <FieldError>
              {formik.touched.Password && formik.errors.Password
                ? formik.errors.Password
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