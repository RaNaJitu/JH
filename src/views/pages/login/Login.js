import "../../../public/CSS/Login.css";
import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { CircularProgress } from "@mui/material";
import handleOnLogin from "../../../utils/loginHandle.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formFields, setFormFields] = useState({
    email: "vendor1@example.com",
    password: "Aarrsolpvt23",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  function assignFormFields(e) {
    const { name, value } = e.target;
    setFormFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function loginHandle() {
    // if (formFields.email.trim() == "") {
    //   if (formFields.password.trim() != "") {
    //     setPasswordError("");
    //   }
    //   setEmailError("Email id is required");
    //   return;
    // }
    // if (!formFields.email.includes("@")) {
    //   setEmailError("Enter valid email address");
    //   return;
    // }
    // if (formFields.password.trim() == "") {
    //   if (formFields.email.trim() != "") {
    //     setEmailError("");
    //   }
    //   setPasswordError("Password is required");
    //   return;
    // }
    // setIsLoading(true);
    // handleOnLogin(formFields, navigate, setIsLoading);
    // setIsLoading(false);
  }

  return (
    <MDBContainer fluid className="p-3 my-55 h-custom">
      {isLoading && (
        <div className="loader">
          <CircularProgress />
        </div>
      )}
      <MDBRow className="h-row">
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid"
            alt="Sample image"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBInput
            wrapperClass="mb-4"
            label="Email address"
            id="formControlLg"
            type="email"
            size="lg"
            onChange={assignFormFields}
            name="email"
            value={formFields.email}
            required
          />
          <span
            className="text-danger"
            style={{ position: "relative", top: "-20px", left: "4px" }}
          >
            {emailError}
          </span>
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="formControlLg"
            type="password"
            size="lg"
            onChange={assignFormFields}
            name="password"
            value={formFields.password}
            required
          />
          <span
            className="text-danger"
            style={{ position: "relative", top: "-20px", left: "4px" }}
          >
            {passwordError}
          </span>
          <div className="text-center text-md-start mt-4 pt-2">
            <MDBBtn className="mb-0 px-5" size="lg" onClick={loginHandle}>
              Login
            </MDBBtn>
          </div>
        </MDBCol>
      </MDBRow>

      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2020. All rights reserved.
        </div>
      </div>
    </MDBContainer>
  );
};

export default Login;
