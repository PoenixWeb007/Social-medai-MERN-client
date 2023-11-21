import React from "react";
import styled from "@emotion/styled";
import { Box, alpha, useTheme } from "@mui/material";
//import bg from "%PUBLIC_URL%/assets/bg_login.png";

function AuthForm({ formik, children, onSubmit, wide = false }) {
  const theme = useTheme();
  const style = {
    "& h1": { margin: 4 },
    "& button": { mt: 4, width: "auto", px: 10 },
    "& .MuiTextField-root": { my: 3, width: "35ch" },
    "& form": {
      width: `${wide ? "70%" : "30%"}`,
      minWidth: "380px",
      p: 2,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
      background: `${alpha(theme.palette.background.alt, 0.13)}`,
      borderRadius: `16px`,
      backdropFilter: `blur(13.1px)`,
      border: `1px solid rgba(255, 255, 255, 0.3)`,
      boxShadow: `0 4px 30px ${
        !formik.dirty
          ? `${alpha(theme.palette.neutral.main, 0.17)}`
          : formik.isValid
          ? `rgba(0, 229, 255, 0.8)`
          : `rgba(255, 128, 171, 0.8)`
      }`,
    },
    width: "100%",
    height: "100%",
    minHeight: "700px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    //mt: 11,
    padding: 4,
    //borderRadius: `16px`,
    backgroundImage:
      theme.palette.mode === "light"
        ? `url("/assets/bg_login.png")`
        : `url("/assets/bg_login_dark.png")`, // Chemin vers votre image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backdropFilter: "blur(12.3px)",
  };
  return (
    <Box sx={style} noValidate autoComplete="off">
      <form onSubmit={onSubmit}>{children}</form>
    </Box>
  );
}

export default AuthForm;
