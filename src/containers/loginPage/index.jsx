import React from "react";
import { Formik } from "formik";
import { loginSchema } from "../../schemas/AuthSchema";
import { TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginForm from "../../components/LoginForm.styled";
import { StyledLoginPage } from "./LoginPage.styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Field from "../../components/Field";

const LoginPage = () => {
  return (
    <StyledLoginPage>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            resetForm();
            setSubmitting(false);
          }, 2000);
        }}
      >
        {(formik) => (
          <LoginForm formik={formik} onSubmit={formik.handleSubmit}>
            <h1>Log In</h1>
            <AccountCircleIcon sx={{ fontSize: 140, color: "#f6f6f6" }} />
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

            <LoadingButton
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
              size="large"
              onClick={formik.handleSubmit}
              loading={formik.isSubmitting}
              loadingIndicator="Loading…"
              variant="contained"
            >
              <span>Login</span>
            </LoadingButton>
          </LoginForm>
        )}
      </Formik>
    </StyledLoginPage>
  );
};

export default LoginPage;
