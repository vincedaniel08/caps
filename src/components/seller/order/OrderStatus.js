import React from 'react';
import { Avatar, Box, Grid, Paper, Accordion, AccordionSummary, AccordionDetails, Typography, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IosShareIcon from '@mui/icons-material/IosShare';
import ErrorIcon from '@mui/icons-material/Error';
//backend
import cod from "../../../assets/images/cod.jpg";
import { useSelector } from "react-redux";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// const Img = styled('img')({
//     margin: 'auto',
//     display: 'block',
//     maxWidth: '30px',
//     maxHeight: '30px',
//   });
  

export default function OrderStatus() {
    const userData = useSelector((state) => state.user);
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Item>
                    {userData.orderhistory.map((order, key) => (
              <Box key={key + 1}>
                     
                     <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontWeight: 700,justifyContent:"center",display:"flex" }} noWrap>
                        { order.SellerCancel === true ?
                         <ErrorIcon color="warning" sx={{mr:1}}/>
                         : order.OrderStatus === "Seller preparing your order" ?
                         <IosShareIcon color="primary" sx={{mr:1}}/>
                        : order.OrderStatus === "Rider delivering your order" ?
                      <DeliveryDiningIcon color="primary" sx={{mr:1}}/>
                     : order.OrderStatus === "Ordered Delivered" ?
                      <CheckCircleOutlineIcon color="primary" sx={{mr:1}}/>
                      : ""}
                       {order.OrderId}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      <Typography
                        sx={{ textAlign: "left", fontWeight: 700 }}
                        color="primary"
                      >
                        Buyer Details:
                      </Typography>

                      <Box sx={{ my: 1 }}>
                        <Typography sx={{ textAlign: "left" }}>
                          Name: <b>{order.BuyerName}</b>
                        </Typography>
                        <Typography sx={{ textAlign: "left" }}>
                          Contact Number: <b> {order.BuyerContactNumber} </b>
                        </Typography>
                        <Typography sx={{ textAlign: "left" }} noWrap>
                          Address: <b> {order.BuyerAddress} </b>
                        </Typography>
                      </Box>
                    </Box>
                    <Divider />
                    
                      <Box
                        sx={{
                          my: 1,
                          color:"textPrimary"}}
                          
                       
                      >
                        <Typography
                          sx={{
                            textAlign: "left",
                            fontWeight: 700,
                            color:
                              order.SellerUid ===
                              userData.myuserdata.map((data) => data.id)[0]
                                ? "#479923"
                                : "#696969",
                          }}
                        >
                          Product Details:
                        </Typography>

                        <Box
                          sx={{ my: 1, display: "flex", alignItems: "center" }}
                        >
                          <Avatar src={order.ProductImage} />
                          <Typography sx={{ textAlign: "left", ml: 1 }} noWrap>
                            <b>{order.ProductName}</b>
                          </Typography>
                        </Box>
                        <Typography sx={{ textAlign: "left" }}>
                          Quantity: <b> {order.ProductQty} </b>
                        </Typography>
                        <Typography sx={{ textAlign: "left" }}>
                          Price: <b>{order.ProductPrice}.00 </b>
                        </Typography>
                        <Typography sx={{ textAlign: "left" }}>
                          Amount:{" "}
                          <b>
                            {order.ProductPrice * order.ProductQty}
                            .00{" "}
                          </b>
                        </Typography>
                      </Box>
                  

                    <Divider />
                    <Box sx={{ my: 1 }}>
                      <Typography
                        sx={{ textAlign: "left", fontWeight: 700 }}
                        color="primary"
                      >
                        Order Summary: {" "}
                      </Typography>

                      <Typography sx={{ textAlign: "left", mt: 1, display: "flex", alignItems: "center"  }}>
                        Payment:{" "}
                      
                          {order.Payment === "COD" ? <img src={cod} style={{width:"80px",marginLeft:1}}  alt="cod"/> :  <img src={cod} style={{width:"80px",marginLeft:1}} alt="cod"/> }
                      
                      </Typography>

                      <Typography sx={{ textAlign: "left", mt: 1 }}>
                        Subtotal:{" "}
                        <b>
                          {order.SubTotal}.00
                        </b>
                      </Typography>
                      <Typography sx={{ textAlign: "left" }}>
                        Delivery Fee:{" "}
                        <b>
                          {" "}
                         
                            {order.DeliveryFee}
                          
                          .00{" "}
                        </b>
                      </Typography>
                      <Typography sx={{ textAlign: "left" }}>
                        Total:{" "}
                        <b>
                          {" "}
                           {order.Total}
                         .00{" "}
                        </b>
                      </Typography>
                      
                    </Box>

                          <Typography color={order.SellerCancel === true ? "orange" : "primary"} sx={{fontWeight:700}}>Order Status:  {order.OrderStatus}</Typography>
                    
                  </AccordionDetails>
                </Accordion>
                        </Box>
            ))}
                    </Item>
                </Grid>

            </Grid>
        </Box>

    );


}
