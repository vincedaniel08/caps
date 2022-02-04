import React, { useState } from 'react';
import { Typography, AppBar, Box, Toolbar, Link, IconButton, Badge, Input } from '@mui/material';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import agri from '../image/agri.png';
import CancelIcon from '@mui/icons-material/Cancel';
const Navbarfirst = () => {

    const classDesign = {
        appbarMain: {
            backgroundColor: 'transparent',
            transition: 'ease-out 0.5s',
            boxShadow: '0',
            zIndex: 1,
        },

        appbarScroll: {
            backgroundColor: '#0e7424',
            zIndex: 1,
        },

        navlink: {
            color: 'white',
            fontSize: '15px',
            margin: 2,
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            "&:hover": {
                transition: 'ease-out 0.5s',
                color: '#cf8600',
            },
        },

        logo: {
            backgroundImage: `url(${agri})`,
            backgroundPosition: 'center left',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'contain',
            width: '145px',
            height: '45px',
            margin: 0,
        },


        searchBoxContainer: {
            backgroundColor: '#1e1e1e',
            height: '60px',
            flexGrow: 1,
            zIndex: 1,
            marginBottom: '60px',
            boxShadow: 0,
            transition: 'opacity 1s ease-out',
        },

        searchBox: {
            color: '#fff',
            width: '100%',
            borderBottomColor: '#fff',
            fontSize: '14px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            height: '30px',
            borderRadius: '10px',
            padding: '20px',
        },

        searchBarShow: {
            marginBottom: '60px',
        },
        searchIconNoFunc: {
            color: '#fff',
        },

        closeIconFunc: {
            color: '#fff',
        },

    }

    const [Navbar, setNavbar] = useState(false);
    const [show, setShow] = useState(false);
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavbar(true);
        } else {
            setNavbar(false);
        }
    };
    window.addEventListener('scroll', changeBackground);



    return (
        <Box>
            <AppBar sx={Navbar ? classDesign.appbarScroll : classDesign.appbarMain}>


                {show ?
                    <Box component="div" sx={classDesign.searchBarShow}>
                        <AppBar sx={classDesign.searchBoxContainer}>
                            <Toolbar>
                                <IconButton size="large" onClick={() => setShow(true)} sx={classDesign.searchIconNoFunc}>
                                    <SearchIcon />
                                </IconButton>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1 },
                                        margin: 'auto',
                                        width: '100%',
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <Input placeholder="Search" sx={classDesign.searchBox} fullWidth disableUnderline />
                                </Box>
                                <IconButton size="large" onClick={() => setShow(false)} sx={classDesign.closeIconFunc}>
                                    <CancelIcon />
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </Box> : null
                }


                <Toolbar >

                    <Box sx={classDesign.logo} />

                    <Box component="span" sx={{ flexGrow: 1 }} />

                    <Link href="#" underline="none">
                        <Typography sx={classDesign.navlink}>Home</Typography>
                    </Link>

                    <Link href="#" underline="none">
                        <Typography sx={classDesign.navlink}>Categories</Typography>
                    </Link>

                    <Link href="#" underline="none">
                        <Typography sx={classDesign.navlink}>Shop</Typography>
                    </Link>

                    <Link href="#" underline="none">
                        <Typography sx={classDesign.navlink}>Agrishop</Typography>
                    </Link>

                    <Box component="span" sx={{ flexGrow: 0.1 }} />

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton size="large">
                            <Badge badgeContent={1} color="error">
                                <LocalMallIcon />
                            </Badge>
                        </IconButton>

                        <IconButton size="large" onClick={() => setShow(true)}>
                            <SearchIcon />
                        </IconButton>

                        <IconButton>
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>

    );
}

export default Navbarfirst;
