import React from "react";
import { Avatar, Box, Typography,Badge } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from '@mui/icons-material/Home';
//import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/actions/uiAction";
import { useHistory } from "react-router-dom";

import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
const classes = {
  box1: {
    alignItems: "center",
    mx: 1,
    display: {
      xs: "none",
      md: "flex",
      xl: "flex",
    },
  },
  iconButton: {
    minWidth: 30,
    color: "white",
  },
  dividerLine: {
    backgroundColor: (theme) => theme.palette.common.white,
    height: 22,
    margin: "0 5px",
    display: {
      xs: "none",
      md: "flex",
      xl: "flex",
    },
  },
  button: {
   mr:-2,
   mb:-.5,

    "&:hover": {
      backgroundColor: "transparent",
    },
    textTransform: "none",
  },

  buttonLabel: {
   
    "&:hover": {
      color: (theme) => theme.palette.secondary.main,
    },
  },
};



export default function AccountMenu() {
  //darkmode
  const history = useHistory();
  const dispatch = useDispatch();
  const ui = useSelector((state) => state.ui);

  const buttonHome = () => {
    history.push('/home')
  } 
  const _toggleTheme = () => {
    dispatch(toggleTheme(!ui.isDarkMode));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        history.push("/login")
        window.location.reload()
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <React.Fragment>
      <Box sx={classes.box1}>
        <Tooltip title="Notification">
          <IconButton sx={classes.iconButton}>
          <Badge  variant="dot" overlap="circular" color="warning">
            <NotificationsNoneIcon sx={{color:'text.primary'}}/>
            </Badge>
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Divider orientation="vertical" flexItem sx={classes.dividerLine} />
      </Box>
      <Box>
        <Tooltip title="Account settings">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 1 }}>
            <Avatar sx={{ width: 25, height: 25 }}></Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
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
        
        
        <MenuItem onClick={buttonHome}>
          <ListItemIcon >
            <HomeIcon fontSize="small" />
          </ListItemIcon>
          Buyer Side
        </MenuItem>
        
        <MenuItem  onClick={_toggleTheme} >
        <ListItemIcon>
        {ui.isDarkMode ? <DarkModeIcon /> : <LightModeIcon />}
          </ListItemIcon>
        <Typography color="textPrimary" sx={{ mb:-.5}}>
                {ui.isDarkMode ? "Dark Mode"  : "Light Mode"}
              </Typography>
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}