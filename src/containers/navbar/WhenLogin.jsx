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
import { Divider, ListItemIcon } from "@mui/material";
import { Logout, Settings } from "@mui/icons-material";

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

  const handleLougOut = (setting) => {
    setAnchorEl(null);
    localStorage.removeItem("user");
    dispatch(setLogout());
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              {...stringAvatar(`${fullName.toUpperCase()}`)}
              sx={{
                //bgcolor: `primary.dark`,
                color: `neutral.dark`,
                "& p": { fontSize: "24px", margin: 0 },
              }}
              aria-label="recipe"
            />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              minWidth: "190px",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={() => {}}>
            <Avatar /> Profile
          </MenuItem>

          <Divider />

          <MenuItem onClick={() => {}}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={handleLougOut}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
}

export default WhenLogin;
