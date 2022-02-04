import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import style from '../styles/Footer';
import Gcash from '../image/gcash.png';
import Cod from '../image/cod.jpg';
import Rider from '../image/logistic1.jpg';
import It from '../image/it.png';
import Main from '../image/main.png';
import Candaba from '../image/candaba.png';

import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GoogleIcon from '@mui/icons-material/Google';


const Footer = () => {
    return (
        <Box sx={style.footerMainBox}>
            <Box sx={style.mainContainer}>

                {/*This is the top section of the footer*/}
                <Grid container sx={style.mainGrid} >

                    {/*Column 1*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            Categories
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Vegetables
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Fruits
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Meat
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Poultry
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Seafood
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Rice
                        </Typography>
                    </Grid>

                    {/*Column 2*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            AGRISHOP
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Teams
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Services
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Support
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Our Objective
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Terms and Conditions
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Community Rules
                        </Typography>
                    </Grid>

                    {/*Column 3*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            Information
                        </Typography>
                        <Typography sx={style.footerContent}>
                            About Us
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Special
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Popular
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Best Sellers
                        </Typography>
                        <Typography sx={style.footerContent}>
                            Featured
                        </Typography>
                        <Typography sx={style.footerContent}>
                            New Product
                        </Typography>
                    </Grid>

                    {/*Column 4*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            Contact Us
                        </Typography>
                        <Typography sx={style.footerContentText}>
                            Mobile: +63 935 535 6944
                        </Typography>
                        <Typography sx={style.footerContentText}>
                            Telephone: 792 5144
                        </Typography>
                        <Typography sx={style.footerContentText}>
                            Email: agri20@gmail.com
                        </Typography>
                        <Typography sx={style.footerContentText}>
                            Address: 502 5th St., Tenejero, Candaba, Pampanga.
                        </Typography>

                        <Box sx={style.socmedLink}>
                            <Box sx={style.socmedContainer}>
                                <FacebookOutlinedIcon sx={style.socmed} />
                            </Box>
                            <Box sx={style.socmedContainer}>
                                <TwitterIcon sx={style.socmed} />
                            </Box>
                            <Box sx={style.socmedContainer}>
                                <InstagramIcon sx={style.socmed} />
                            </Box>
                            <Box sx={style.socmedContainer}>
                                <YouTubeIcon sx={style.socmed} />
                            </Box>
                            <Box sx={style.socmedContainer}>
                                <GoogleIcon sx={style.socmed} />
                            </Box>
                            <Box sx={style.socmedContainer}>
                                <LinkedInIcon sx={style.socmed} />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

            </Box>
            {/*Top section ends here*/}
            {/*This is the bottom section of the footer*/}
            <Box sx={style.mainContainer}>
                <Grid container sx={style.mainGrid}>

                    {/*Column 5*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            Customer Service
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Help Centre
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Payment Methods
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Order Tracking
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Change Product
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Privacy Policy
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Developer Team
                        </Typography>
                    </Grid>

                    {/*Column 6*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            My Account
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Checkout
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            My Orders
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            My Personal Info
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            My Shop
                        </Typography>
                        <Typography variant="h1" sx={style.footerContent}>
                            Billing Addresses
                        </Typography>
                    </Grid>

                    {/*Column 7*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            Payment
                        </Typography>

                        <Box>
                            <img alt='gcash' src={Gcash}
                                style={{
                                    width: '120px',
                                }}
                            />
                        </Box>

                        <Box>
                            <img alt='cod' src={Cod}
                                style={{
                                    width: '120px',
                                }}
                            />
                        </Box>

                        <Typography variant="h1" sx={style.footerTitle}>
                            Logistic
                        </Typography>

                        <Box>
                            <img alt='rider' src={Rider}
                                style={{
                                    width: '120px',
                                }}
                            />
                        </Box>

                    </Grid>

                    {/*Column 8*/}
                    <Grid item sx={style.perContainer}>
                        <Typography variant="h1" sx={style.footerTitle}>
                            In partnership with
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', }}>
                            <img alt='main' src={Main}
                                style={{
                                    width: '70px',
                                }}
                            />

                            <img alt='it' src={It}
                                style={{
                                    width: '70px',
                                }}
                            />

                            <img alt='candaba' src={Candaba}
                                style={{
                                    width: '70px',
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={style.boxFooter}>
                <Typography sx={style.boxMiniFooter}>
                    Agrishop - Capstone Project By BSIT 4B Group 1. Bulacan State University Bustos, Campus.
                </Typography>
            </Box>
           
            {/*Bottom section ends here*/}
        </Box>
    );
}

export default Footer;
