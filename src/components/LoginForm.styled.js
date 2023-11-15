import React from "react";
import styled from "@emotion/styled";
import { Box } from "@mui/material";

function LoginForm({ formik, children, onSubmit, wide = false }) {
  const style = {
    "& h1": {},
    "& form": {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
    mt: 14,
    width: `${wide ? "50%" : "30%"}`,
    minWidth: "420px",
    //justifyContent: "center",
    padding: 4,
    borderRadius: "16px",
    background: `rgba(255, 255, 255, 1)`,
    boxShadow: `0 4px 30px ${
      !formik.dirty
        ? `rgba(0, 0, 0, 0.1)`
        : formik.isValid
        ? `rgba(17, 219, 245, 0.7)`
        : `rgba(245, 17, 17, 0.7)`
    }`,
    backdropFilter: "blur(12.3px)",
    border: "1px solid rgba(255, 255, 255, 0.07)",
    "& .MuiTextField-root": { my: 3, width: "35ch" },
  };
  return (
    <Box sx={style} noValidate autoComplete="off">
      <form onSubmit={onSubmit}>{children}</form>
    </Box>
  );
}

export default LoginForm;
