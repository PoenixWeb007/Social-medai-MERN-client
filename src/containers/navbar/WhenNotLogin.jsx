import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { websiteName } from "../../App";
import { ThemeSwitch } from "../../components/themeSwitch";

function WhenNotLogin() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography
        variant="h1"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {websiteName}
      </Typography>
      <ThemeSwitch />
    </Box>
  );
}

export default WhenNotLogin;
