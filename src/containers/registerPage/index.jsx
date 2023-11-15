import React, { useState } from "react";
import { Formik } from "formik";
import {
  Alert,
  AlertTitle,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import AuthForm from "../../components/AuthForm.styled";
import { registerSchema } from "../../schemas/AuthSchema";
import Field from "../../components/Field";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Link, Navigate, json } from "react-router-dom";
import { api } from "../../APIEndpoints";
import SubmitButton from "../../components/SubmitButton";

const registerPath = api.auth.register;
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
  occupation: "",
  acceptedTerms: false,
};
const fields = [
  { name: "firstName", label: "First name", type: "text" },
  { name: "lastName", label: "Last name", type: "text" },
  { name: "email", label: "Location", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "occupation", label: "Occupation", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm password", type: "password" },
];
let userName = "";

const formattedFormData = ({
  firstName,
  lastName,
  email,
  password,
  location,
  occupation,
}) => ({ firstName, lastName, email, password, location, occupation });

function RegisterPage() {
  const [Error, setError] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const handleSubmit = (values, { setSubmitting }) => {
    const formattedValues = formattedFormData(values);

    fetch(registerPath, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedValues),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.error) {
          setError(r.error);
        } else {
          userName = r.firstName;
          setIsSucceeded(true);
          setError(null);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    setSubmitting(false);
  };

  if (isSucceeded) {
    return (
      <Box
        sx={{
          mt: 4,
          width: "50%",
          boxShadow: `0 4px 30px rgba(0, 0, 0, 0.1)`,
          "& a": { textDecoration: "none", fontSize: "16px" },
          "& strong": { fontSize: "18px" },
          "& p": { fontSize: "16px" },
        }}
      >
        <Alert severity="success">
          <AlertTitle>
            <strong>Congratulations {userName}</strong>
          </AlertTitle>
          <p> You have successfully signed up. Welcome aboard! —</p>
          <Link to="/login"> Log in now</Link>
        </Alert>
      </Box>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <AuthForm formik={formik} onSubmit={formik.handleSubmit} wide={true}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1>Register</h1>
            <PersonAddRoundedIcon fontSize="large" />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-evenly",
            }}
          >
            {fields.map(({ name, type, label }) => (
              <Field
                type={type}
                id="outlined-error"
                label={label}
                formik={formik}
                name={name}
              />
            ))}
          </Box>

          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.acceptedTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="acceptedTerms"
              />
            }
            label="Accept Terms"
          />

          <SubmitButton formik={formik}>Create Account</SubmitButton>

          {Error && (
            <Alert severity="error" sx={{ m: 3, width: "100%" }}>
              <AlertTitle>Login Failed</AlertTitle>
              {Error}
            </Alert>
          )}
        </AuthForm>
      )}
    </Formik>
  );
}

export default RegisterPage;
