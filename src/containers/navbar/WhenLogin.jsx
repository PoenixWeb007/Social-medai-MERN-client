import React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import { websiteName } from "../../App";
import { setLogout } from "../../state/reducerSlices/userSlice";
import { ThemeSwitch } from "../../components/themeSwitch";
import { stringAvatar } from "../../utilities/stringAvatar";

const settings = ["Profile", "Logout"];

function WhenLogin() {
  const fullName = useSelector(
    (state) => `${state.global.user.firstName} ${state.global.user.lastName}`
  );
  const id = useSelector((state) => state.global.user._id);
  const pages = [
    { label: "Home", path: "/home" },
    { label: "My profile", path: `/profile/${id}` },
    { label: "My friends", path: "/friends/" },
  ];
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    // Navigate("/profile");
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      localStorage.removeItem("user");
      dispatch(setLogout());
    }
  };
  return (
    <>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          {pages.map((page) => (
            <MenuItem key={page.label} onClick={handleCloseNavMenu}>
              <Typography
                component="a"
                href={page.path}
                textAlign="center"
                sx={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                {page.label}
              </Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "start",
        }}
      >
        <Typography
          variant="h2"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          {websiteName}
        </Typography>
        {pages.map((page) => (
          <Typography
            component="a"
            variant="h5"
            href={page.path}
            key={page.label}
            onClick={handleCloseNavMenu}
            sx={{
              textDecoration: "none",
              m: 1,
              color: "white",
              display: "block",
            }}
          >
            {page.label}
          </Typography>
        ))}
      </Box>
      <Typography
        variant="h2"
        noWrap
        component="a"
        href=""
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        {websiteName}
      </Typography>

      <Box sx={{ flexGrow: 0 }}>
        <ThemeSwitch />
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar {...stringAvatar(`${fullName.toUpperCase()}`)} />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={() => handleCloseUserMenu(setting)}
            >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}

export default WhenLogin;
