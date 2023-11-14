import React, { useState } from "react";
import { Formik } from "formik";
import { loginSchema } from "../../schemas/AuthSchema";
import { Alert, AlertTitle, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LoginForm from "../../components/LoginForm.styled";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Field from "../../components/Field";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/reducerSlices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [Error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setSubmitting(true);
    fetch("http://localhost:4000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        if (r.err) {
          setError(r.err);
        } else {
          dispatch(setLogin(r));
          localStorage.setItem("user", JSON.stringify(r));
          setError(null);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
            sx={{ width: "50%", fontSize: "16px" }}
          >
            <span>Login</span>
          </LoadingButton>
          <Button
            variant="text"
            sx={{
              mt: 4,
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
        </LoginForm>
      )}
    </Formik>
  );
};

export default LoginPage;
