import { Formik } from "formik";
import React, { useState } from "react";
import LoginForm from "../../components/LoginForm.styled";
import { registerSchema } from "../../schemas/AuthSchema";
import Field from "../../components/Field";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Link, Navigate, json } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { api } from "../../APIEndpoints";

const registerPath = api.auth.register;
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
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        occupation: "",
        acceptedTerms: false,
      }}
      validationSchema={registerSchema}
      onSubmit={(values, { setSubmitting }) => {
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
      }}
    >
      {(formik) => (
        <LoginForm formik={formik} onSubmit={formik.handleSubmit} wide={true}>
          <Box>
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
            <Field
              type="text"
              id="outlined-error"
              label="First name"
              formik={formik}
              name="firstName"
            />
            <Field
              type="text"
              id="outlined-error"
              label="Last name"
              formik={formik}
              name="lastName"
            />
            <Field
              type="email"
              id="outlined-error"
              label="Email"
              formik={formik}
              name="email"
            />
            <Field
              type="text"
              id="outlined-error"
              label="Location"
              formik={formik}
              name="Location"
            />
            <Field
              type="text"
              id="outlined-error"
              label="Occupation"
              formik={formik}
              name="occupation"
            />
            <Field
              type="password"
              id="outlined-error"
              label="Password"
              formik={formik}
              name="password"
            />
            <Field
              type="password"
              id="outlined-error"
              label="Confirm your password"
              formik={formik}
              name="confirmPassword"
            />
          </Box>
          <FormControlLabel
            //sx={{ alignSelf: "start" }}
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

          <LoadingButton
            type="submit"
            disabled={!formik.isValid || !formik.dirty}
            size="large"
            onClick={formik.handleSubmit}
            loading={formik.isSubmitting}
            loadingIndicator="Loading…"
            variant="contained"
            md={{ width: "50%", fontSize: "16px" }}
          >
            <span>Create Account</span>
          </LoadingButton>

          {Error && (
            <Alert severity="error" sx={{ m: 3, width: "100%" }}>
              <AlertTitle>Login Failed</AlertTitle>
              {Error}
            </Alert>
          )}
        </LoginForm>
      )}
    </Formik>
  );
}

export default RegisterPage;
