import React, { useState } from "react";
import { Formik } from "formik";
import {
  Alert,
  AlertTitle,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import AuthForm from "../../components/AuthForm.styled";
import { registerSchema } from "../../schemas/AuthSchema";
import Field from "../../components/Field";
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import { fetchRegister } from "../../utilities/fetchAuth";

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
  { name: "email", label: "Email", type: "text" },
  { name: "location", label: "Location", type: "text" },
  { name: "occupation", label: "Occupation", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "confirmPassword", label: "Confirm password", type: "password" },
];

const formattedFormData = ({
  firstName,
  lastName,
  email,
  password,
  location,
  occupation,
}) => ({ firstName, lastName, email, password, location, occupation });

function RegisterPage() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const [isSucceeded, setIsSucceeded] = useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formattedValues = formattedFormData(values);
      const registeredUserName = await fetchRegister(
        formattedValues,
        setError,
        setIsSucceeded
      );
      setUserName(registeredUserName);
      console.log("User registered:", registeredUserName);
    } catch (error) {
      // Handle registration error
      console.error("Registration error:", error);
      setError(error);
    } finally {
      setSubmitting(false);
    }
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
            <Typography variant="h4" fontWeight={500}>
              Congratulations {userName}
            </Typography>
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
            <Typography
              variant="h1"
              noWrap
              href="/"
              sx={{
                mr: 2,
                fontWeight: 500,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Register
            </Typography>
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

          {error && (
            <Alert severity="error" sx={{ m: 3, width: "100%" }}>
              <AlertTitle>Login Failed</AlertTitle>
              {error}
            </Alert>
          )}
        </AuthForm>
      )}
    </Formik>
  );
}

export default RegisterPage;
