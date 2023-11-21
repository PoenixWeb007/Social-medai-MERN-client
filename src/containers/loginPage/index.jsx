import React, { useState } from "react";
import { Formik } from "formik";
import { loginSchema } from "../../schemas/AuthSchema";
import { Alert, AlertTitle, Button, Typography } from "@mui/material";
import AuthForm from "../../components/AuthForm.styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Field from "../../components/Field";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/SubmitButton";
import { fetchLogin } from "../../utilities/fetchAuth";

const LoginPage = () => {
  const [Error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    fetchLogin(values, setError, dispatch);
    resetForm();
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <AuthForm formik={formik} onSubmit={formik.handleSubmit}>
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
            Log In
          </Typography>
          <AccountCircleIcon sx={{ fontSize: 140, color: "neutral.main" }} />
          <Field
            type="email"
            id="outlined-error"
            label="Email"
            formik={formik}
            name="email"
          />
          <Field
            type="password"
            id="outlined-error"
            label="password"
            formik={formik}
            name="password"
          />

          <SubmitButton formik={formik}>Login</SubmitButton>
          <Button
            variant="text"
            sx={{
              // mt: 4,
              fontSize: "16px",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>

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
};

export default LoginPage;
