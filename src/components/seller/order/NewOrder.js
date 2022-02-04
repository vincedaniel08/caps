import React from "react";
import {
  Avatar,
  Box,
  Grid,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  Divider,
  Modal,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useSelector } from "react-redux";

// backend

import { db } from "../../../utils/firebase";
import {
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  //  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewOrder() {
  const userData = useSelector((state) => state.user);
  const [open, setOpen] = React.useState(false);
  const [cancel, setCancel] = React.useState("");
  const [orderId, setOrderId] = React.useState("");

  const handleChangeCancel = (event) => {
    setCancel(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //const reducer = (previousValue, currentValue) => previousValue + currentValue;
  // const id = userData.orders.map(() => order.SellerUid  )
  const buttonDecline = (id) => {
    handleOpen();
    setOrderId(id)
  };
  const buttonClose = (id) => {
    handleClose();
  };
  const buttonDeclineConfirm= async() => {
    const orderRef = doc(db, "Orders", orderId);
    await updateDoc(orderRef, {
      SellerAccept: true,
      SellerCancel: true,
      OrderStatus: cancel,
      UpdateDate: Timestamp.fromDate(new Date()),
    });
    
};
  const buttonAccept = async (id) => {
    const orderRef = doc(db, "Orders", id);
    await updateDoc(orderRef, {
      SellerAccept: true,
      OrderStatus: "Seller preparing your order",
      UpdateDate: Timestamp.fromDate(new Date()),
    });
  };

  return (
    <Box>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" sx={{ my: 2 }}>
            Why Seller Cancel the order?
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Reasons</InputLabel>
            <Select
              value={cancel}
              label="Reasons"
              onChange={handleChangeCancel}
            >
              <MenuItem value={"Out of Stock"}>Out of Stock</MenuItem>
              <MenuItem value={"Seller Inactive"}>Seller Inactive</MenuItem>
              <MenuItem value={"Not Available"}>Not Available</MenuItem>
            </Select>
          </FormControl>
          <Button sx={{my:1}} color="error" onClick={buttonClose}>Cancel</Button>
          <Button sx={{my:1}} color="warning" onClick={buttonDeclineConfirm}>Confirm</Button>
        </Box>
      </Modal>

      <Grid container>
        <Grid item xs={12}>
          <Item>
            {userData.orders.map((order, key) => (
              <Box key={key + 1}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography sx={{ fontWeight: 700 }} noWrap>
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
                        color: "textPrimary",
                      }}
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
                        Order Summary:
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

                    <Button
                      color={"error"}
                      variant="outlined"
                      sx={{ mr: 1 }}
                      onClick={() => buttonDecline(order.id)}
                    >
                      Decline
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => buttonAccept(order.id)}
                    >
                      Accept
                    </Button>
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
