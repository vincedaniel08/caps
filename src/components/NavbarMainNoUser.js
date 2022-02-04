import React, { useState } from 'react';
import style from '../styles/NavbarMain';
import { Box, AppBar, Toolbar, Typography, IconButton, Badge, List, ListItem, Drawer, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import FaceIcon from '@mui/icons-material/Face';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import us from '../image/us.png';
import phil from '../image/phil.png';
import { useSelector,useDispatch } from 'react-redux';
import { Link as RLink ,useHistory } from "react-router-dom";
import { setLang } from '../redux/actions/uiAction';

//language
import * as en  from "../language/en";
import * as tl from "../language/tl";

const NavbarmainNoUser = () => {
    
    const dispatch = useDispatch();
    const history = useHistory();
    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (e) => { setState(open) };
    const uiData = useSelector((state) => state.ui);
    const [language] = useState(uiData.lang === "en" ? en : tl);

    const loginButton = () => {
        history.push("/login")
    }
   
    const buttonTagalog = () =>{
        dispatch(setLang("tl"));
     }
     const buttonEnglish = () =>{
        dispatch(setLang("en"));
    }


    const list = () => (
        <Box sx={style.listbox}>

            <Box sx={style.closeDrawer}>
                <Typography sx={style.titleDrawer}>My Account</Typography>
                <Box component="span" sx={{ flexGrow: 1 }} />
                <IconButton
                    onClick={toggleDrawer(false)}
                >
                    <CancelIcon sx={style.closeDrawerIcon} />
                </IconButton>
            </Box>

            <List>

             

                <hr />

                <ListItem>
                    <FaceIcon sx={{ color: '#9F9F9F', }} />
                    <Box component="span" sx={{ flexGrow: 0.05 }} />
                    <Link  component={RLink} to={"/login"} underline="none">
                        <Typography sx={style.linkDrawer}>{language.Drawer_Login}</Typography>
                    </Link>
                </ListItem>

                <ListItem sx={{ marginTop: '-10px', marginBottom: '10px' }}>
                    <AppRegistrationIcon sx={{ color: '#9F9F9F', }} />
                    <Box component="span" sx={{ flexGrow: 0.15 }} />
                    <Link  component={RLink} to={"/register"} underline="none">
                        <Typography sx={style.linkDrawer}>{language.Drawer_Register}</Typography>
                    </Link>
                </ListItem>

              
            </List>

            <Box sx={style.closeDrawer}>
                <Typography sx={style.titleDrawer}>{language.Drawer_Language}</Typography>
            </Box>

            {/*LIST FOR LANGUAGE*/}
            <List>
                {/*ENGLISH*/}
                <ListItem onClick={buttonEnglish}>
                    <img src={us} width="20px" alt="American Flag" />
                    <Box component="span" sx={{ flexGrow: 0.12 }} />
                    <Link href="#" underline="none">
                        <Typography sx={style.linkDrawerLang} color={uiData.lang  === "en" ? "primary" : "#9F9F9F" }>US English</Typography>
                    </Link>
                </ListItem>

                {/*TAGALOG*/}
                <ListItem onClick={buttonTagalog}>
                    <img src={phil} width="20px" alt="Philippine Flag"/>
                    <Box component="span" sx={{ flexGrow: 0.15 }} />
                    <Link href="#" underline="none">
                        <Typography sx={style.linkDrawerLang} color={uiData.lang  === "tl" ? "primary" : "#9F9F9F"} >PHL Tagalog</Typography>
                    </Link>
                </ListItem>
            </List>

            <List>
                <ListItem>
                    <Typography sx={style.copyright}>Copyright 2021 © Agrishop App.</Typography>
                </ListItem>
            </List>
        </Box>
    );
    const windowScroll = () => {
        window.scrollTo(0, 0);
        setNavbar(false);
    }
    const [Navbar, setNavbar] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 30) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };
    window.addEventListener('scroll', changeBackground);


    return (
        <Box>
            {/*APPBAR start here*/}
            <AppBar sx={Navbar ? style.appbarScroll : style.appbar} color="transparent">

                <Toolbar>
                    {/*MENU RESPONSIVE here*/}
                    <IconButton sx={style.menuIconContainer}>
                        <MenuIcon sx={style.icon} />
                    </IconButton>

                    {/*LOGO here*/}
                    <Box sx={style.boxLogo} />
                    <Box component="span" sx={{ flexGrow: 1 }} />

                    {/*LINKS here*/}
                    <Link component={RLink} to={"/home"}  style={{ textDecoration: 'none' }} onClick={windowScroll}>
                        <Typography sx={Navbar ? style.navlinkScroll : style.navlink}>{language.HEADER_Home}</Typography>
                    </Link>


                

                    <Link component={RLink} to={"/shop"}  style={{ textDecoration: 'none' }} onClick={windowScroll}>
                        <Typography sx={Navbar ? style.navlinkScroll : style.navlink}>{language.HEADER_Shop}</Typography>
                    </Link>




             
                    {/*CART Icon*/}
                    <IconButton sx={Navbar ? style.iconContainerScroll : style.iconContainer} onClick={loginButton}>
                        <Badge  color="error">
                            <LocalMallIcon sx={style.icon} />
                        </Badge>
                    </IconButton>

                    {/*NOTIFICATION Icon*/}
                    <IconButton sx={Navbar ? style.iconContainerScroll : style.iconContainer}>
                        <NotificationsIcon sx={style.icon} />
                    </IconButton>

                 }

                    {/*MENU here*/}
                    <IconButton sx={Navbar ? style.iconContainerScroll : style.iconContainer}
                        onClick={toggleDrawer(true)}
                    >
                        <MenuIcon sx={style.icon} />
                    </IconButton>

                    {/*Right Drawer*/}

                    <Drawer
                        anchor={'right'}
                        open={state}
                        onClose={toggleDrawer(false)}
                        sx={style.root}
                    >
                        {list()}
                    </Drawer>
                </Toolbar>
            </AppBar>
            {/*APPBAR end here*/}

        </Box >
    );
}

export default NavbarmainNoUser;
