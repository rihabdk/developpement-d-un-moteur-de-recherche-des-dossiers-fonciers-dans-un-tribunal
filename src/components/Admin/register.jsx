import React from "react";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { FieldContainer,FormError, FieldError , FormSuccess} from "./commun";
import axios from "axios";
import { useState } from "react";
const validationSchema = yup.object({
firstname: yup.string().min(3 , "please enter 3 caracters ").required(),
lastname: yup.string().min(3 , "please enter 3 caracters ").required(),
Emailadress: yup.string().email("please enter a validate email address").required(),
password: yup.string().min(8, "please insert a striong password").required(),
});
export default function Register () {
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState(null);

    const onSubmit = async (values) => {
        const { data } = values;
    
        const response = await axios
          .post("http://localhost:4000/users/register", data)
          .catch((err) => {
            if (err && err.response)
             setError(err.response.data.message);
            setSuccess(null);
          });
    
        if (response && response.data) {
          setError(null);
          setSuccess(response.data.message);
          formik.resetForm();
        }
      };
    const formik =  useFormik({initialValues:
         { firstname: "",
          lastname: "", 
          Emailadress: "",
           password:""},
validateOnBlur: true,
onSubmit,
validationSchema: validationSchema,
});
console.log("Error: " , error);

return (
    <div className="auth-wrapper">
    <div className="auth-inner">
  { !error && <FormSuccess> {success ? success : ""} </FormSuccess>}  
  { !success && <FormError> {error ? error : ""} </FormError>}  

    <Form onSubmit={formik.handleSubmit}>
        <h3>Sign Up</h3>
        <FieldContainer>
        <div className="form-group">
            <label>First name</label>
            <input name="firstname" type="text" className="form-control" placeholder="First name"
             value={formik.values.firstname} onChange={formik.handleChange} 
             onBlur={formik.handleBlur}
             />
        </div>
        <FieldError> {formik.touched.firstname && formik.errors.firstname ? formik.errors.firstname : "" } </FieldError>
        </FieldContainer>
        <FieldContainer>
           <div className="form-group">
            <label>Last name</label>
            <input name="lastname" type="text" className="form-control" placeholder="Last name"
            value={formik.valueslastname} onChange={formik.handleChange} onBlur={formik.handleBlur}
            />
        </div>
        <FieldError> {formik.touched.lastname && formik.errors.lastname ? formik.errors.lastname : "" } </FieldError>

        </FieldContainer>
        <FieldContainer>

        <div className="form-group">
            <label>Email address</label>
            <input name="Emailadress" type="email" className="form-control" placeholder="Enter email" 
           value={formik.values.Emailadress} onChange={formik.handleChange}  onBlur={formik.handleBlur}
           />
        </div>
        <FieldError>
             {formik.touched.Emailadress &&
              formik.errors.Emailadress ? 
              formik.errors.Emailadress : "" }
               </FieldError>

        </FieldContainer>
        <FieldContainer>

        <div className="form-group">
            <label>Password</label>
            <input name="password" type="password" className="form-control" placeholder="Enter password"
            value={formik.values.password} onChange={formik.handleChange}  onBlur={formik.handleBlur}
            />
        </div>
        <FieldError> {formik.touched.password && formik.errors.password ? formik.errors.password : "" } </FieldError>

        </FieldContainer>
        <button type="submit" disabled={!formik.isValid} className="btn btn-primary btn-block">Sign Up</button>
        <p className="forgot-password text-right">
            Already registered <a href="/">sign in?</a>
        </p>
    </Form>
    </div>
    </div>
);
}