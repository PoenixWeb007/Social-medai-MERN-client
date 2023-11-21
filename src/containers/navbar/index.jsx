import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import WhenLogin from "./WhenLogin";
import WhenNotLogin from "./WhenNotLogin";

function Navbar() {
  const token = useSelector((state) => state.global.token);

  return (
    <AppBar position="static" sx={{ alignItems: "center" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {token ? <WhenLogin /> : <WhenNotLogin />}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
