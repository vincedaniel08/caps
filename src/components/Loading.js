import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

export default function Loading() {
  const classes ={
    mainBox:{
      display: 'flex',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      height: "100vh",
      backgroundColor: 'transparent',
    }
  }
    return (
      <Box sx={classes.mainBox}>
      <Box position="relative" display="inline-flex">
        <CircularProgress sx={{color:"#5DDC9A"}} />
        <Box
            top={0}
            left={0}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
           
            <ShoppingBasketIcon sx={{color:"#5DDC9A"}}/>
            
        </Box>
        </Box>
        </Box>
    )
}
