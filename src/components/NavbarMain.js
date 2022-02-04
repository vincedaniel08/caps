import React, { useState } from 'react';
import style from '../styles/NavbarMain';
import { Box, AppBar, Toolbar, Typography, IconButton, Badge, List, ListItem, Drawer, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import NotificationsIcon from '@mui/icons-material/Notifications';
//import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import LogoutIcon from '@mui/icons-material/Logout';
import us from '../image/us.png';
import phil from '../image/phil.png';

import { db } from '../utils/firebase';
import { onAuthStateChanged } from '@firebase/auth';
import { updateDoc, doc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";
import { Link as RLink  } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setLang } from '../redux/actions/uiAction';
//import { setCart } from "../redux/actions/userAction";
//language
import * as en  from "../language/en";
import * as tl from "../language/tl";

const Navbarmain = () => {
    
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user);
    const uiData = useSelector((state) => state.ui);
    const [language] = useState(uiData.lang === "en" ? en : tl);
    const history = useHistory();
    const auth = getAuth();
    const [state, setState] = useState(false);
    const toggleDrawer = (open) => (e) => { setState(open) };

    const logoutButton = () => {
        onAuthStateChanged(auth, async(user) => {
          await updateDoc(doc(db, "UserChat", userData.chatUser.find((chat) => (chat.uid === user.uid)).id), {
                isOnline: false,
              });
        
          });
        
        signOut(auth)
          .then(() => {
            // Sign-out successful.
           // dispatch(setCart([]))
            
            history.push("/login")
            window.location.reload()
          })
         
      };
     const buttonTagalog = () =>{
        dispatch(setLang("tl"));
     }
     const buttonEnglish = () =>{
        dispatch(setLang("en"));
    }

    // const language = () => {
     
    //         if(uiData.lang === "en" )
    //         {
    //             English;
    //         }else{
    //              Tagalog;
    //         }
             
           
    // }

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

                <ListItem>
                    <Link component={RLink} to={"/profile"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Profile}</Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link component={RLink} to={"/orderhistory"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Order}</Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link component={RLink} to={"/chat"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Chat}</Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link component={RLink} to={"/mystore"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Store}</Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link component={RLink} to={"/returns"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Returns}</Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link component={RLink} to={"/wishlist"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Wishlist}</Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link component={RLink} to={"/checkout"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Checkout}</Typography>
                    </Link>
                </ListItem>

                <ListItem>
                    <Link component={RLink} to={"/seller"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_Seller}</Typography>
                    </Link>
                </ListItem>

                <ListItem sx={{ alignItems: "center" }}>
                    <Link component={RLink} to={"/contactus"} underline="none" onClick={windowScroll}>
                        <Typography sx={style.linkDrawer}>{language.Drawer_ContactUs}</Typography>
                    </Link>
                </ListItem>

                <hr />

              

                <ListItem onClick={logoutButton} sx={{my:2}}>
                    <LogoutIcon sx={{ color: '#9F9F9F', }} />
                    <Box component="span" sx={{ flexGrow: 0.05 }} />
                        <Typography sx={style.linkDrawer}>{language.Drawer_Logout}</Typography>
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
                    <IconButton component={RLink} to={"/cart"} sx={Navbar ? style.iconContainerScroll : style.iconContainer} onClick={windowScroll}>
                        <Badge badgeContent={(userData.cart).length} color="error">
                            <LocalMallIcon sx={style.icon} />
                        </Badge>
                    </IconButton>

                    {/*NOTIFICATION Icon*/}
                    <IconButton sx={Navbar ? style.iconContainerScroll : style.iconContainer}>
                        <NotificationsIcon sx={style.icon} />
                    </IconButton>

                    {/* SEARCH here
                    <IconButton sx={Navbar ? style.iconContainerScroll : style.iconContainer}>
                        <SearchIcon sx={style.icon} />
                    </IconButton> */}

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

export default Navbarmain;
