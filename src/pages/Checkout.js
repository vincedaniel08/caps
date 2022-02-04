import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Link,
  Breadcrumbs,
  Grid,
  Button,
  TextField,
} from "@mui/material";
import NavbarMain from "../components/NavbarMain";
import style from "../styles/Checkout";
import Footer from "../components/Footer";
import LocationIcon from "@mui/icons-material/LocationOn";
//backend
import { useSelector } from "react-redux";
//import { useHistory } from "react-router-dom";
import {
  where,
  collection,
  query,
  onSnapshot,
  documentId,
  Timestamp,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import Paypal from "./payment/Paypal";
export default function Checkout() {
  const user = useSelector((state) => state.user);
  //const history = useHistory();
  const [products, setProducts] = useState([{ id: "initial" }]);
  const [message, setMessage] = useState("");
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const [checkout, setCheckOut] = useState(false);


  const HandleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const buttonCash = () => {
    console.log("Cash On Delivery");
    // const qty = user.cart.map((carts) => carts.CartQty);
    // const img = products.map((product) => product.ProductImg);

    //var date = new Date();
    var years = new Date().getFullYear();
    var months = new Date().getMonth();
    var text = "" + months + years;
    for (let i = 0; i < 10; i++) {
      var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    auth.onAuthStateChanged(async (users) => {
      const username = user.myuserdata.map((data) => data.UserName);
      const address = user.myuserdata.map((data) => data.UserAddress);
      const contact = user.myuserdata.map((data) => data.ContactNumber);

      //   const id = products.map((product) => product.id);
      //   const img = products.map((product) => product.ProductImg);
      //   const name = products.map((product) => product.ProductName);
      //   const price = products.map((product) => product.ProductSalePrice);
      //   const seller = products.map((product) => product.SellerUid);
      //   const productqty = user.cart.map((carts) => carts.CartQty);

      products.map(
        async (product, key) =>
          await addDoc(collection(db, "Orders"), {
            OrderId: "Agrishop" + text,
            ProductId: product.id,
            ProductImage: product.ProductImg,
            ProductName: product.ProductName,
            ProductPrice: product.ProductSalePrice,
            SellerUid: product.SellerUid,
            ProductQty: user.cart.map((carts) => carts.CartQty)[key],
            BuyerUid: users.uid,
            BuyerMessage: message,
            BuyerName: username[0],
            BuyerAddress: address[0],
            BuyerContactNumber: contact[0],
            OrderStatus: "To Pay",
            SellerAccept: false,
            RiderAccept: false,
            BuyerAccept: false,
            RiderUid: "",
            RiderStatus: false,
            SubTotal: Number(
              user.cart.map((carts) => carts.CartQty)[key] *
                product.ProductSalePrice
            ),
            DeliveryFee: Number(
              60 + 10 * user.cart.map((carts) => carts.CartQty)[key]
            ),
            Total: Number(
              user.cart.map((carts) => carts.CartQty)[key] *
                product.ProductSalePrice +
                60 +
                10 * user.cart.map((carts) => carts.CartQty)[key]
            ),
            Payment: "COD",
            CreatedAt: Timestamp.fromDate(new Date()),
          })
      );

      //   await addDoc(collection(db, "Orders"), {
      //     OrderId: "Agrishop" + text,
      //     ProductId: id,
      //     ProductImage: products.map((product) => product.ProductImg[0]),
      //     ProductName: name,
      //     ProductPrice: price,
      //     SellerUid: seller,
      //     ProductQty: productqty,
      //     BuyerUid: users.uid,
      //     BuyerMessage: message,
      //     BuyerName: username[0],
      //     BuyerAddress: address[0],
      //     BuyerContactNumber: contact[0],
      //     OrderStatus: "To Pay",
      //     RiderUid: "",
      //     RiderStatus: false,
      //     SellerApproved:  products.map((product) => false),
      //     SubTotal: Number(
      //       products
      //         .map(
      //           (carts, key) =>
      //             carts.ProductSalePrice *
      //             user.cart.map((carts) => carts.CartQty)[key]
      //         )
      //         .reduce(reducer)
      //     ),
      //     DeliveryFee: Number(
      //       products
      //         .map(
      //           (product, key) =>
      //             10 * user.cart.map((carts) => carts.CartQty)[key]
      //         )
      //         .reduce(reducer) + 60
      //     ),
      //     Total: Number(
      //       products
      //         .map(
      //           (carts, key) =>
      //             carts.ProductSalePrice *
      //             user.cart.map((carts) => carts.CartQty)[key]
      //         )
      //         .reduce(reducer) +
      //         products
      //           .map(
      //             (product, key) =>
      //               10 * user.cart.map((carts) => carts.CartQty)[key]
      //           )
      //           .reduce(reducer) +
      //         60
      //     ),

      //     CreatedAt: Timestamp.fromDate(new Date()),
      //   });
    });
    setMessage("");
    user.cart.map(async (cart) => await deleteDoc(doc(db, "Cart", cart.id)));
  };


  useEffect(() => {
    // console.log(user.cart);
    // console.log(user.cart.map((carts) => carts.ProductId));
    //console.log("mydata", user.mydata.UserName)
    const fetchData = () => {
      if (user.cart.length >= 1) {
        const id = user.cart.map((carts) => carts.ProductId);
        const qty = user.cart.map((carts) => carts.CartQty);
        console.log("Cart", id);
        const collectionRefCart = collection(db, "Products");
        const qCart = query(collectionRefCart, where(documentId(), "in", id));
        onSnapshot(qCart, (snapshot) =>
          setProducts(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              Cart: qty,
            }))
          )
        );
      } else {
        return null;
      }
    };

    // console.log("cart", user.cart);
    fetchData();
  }, [user.cart]);

  return (
    <Box>
      <NavbarMain />

      {/*Container to ng Breadcrumbs*/}
      <Box sx={style.breadCrumbsContainer}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            paddingTop: { xs: "130px", lg: "100px" },
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontSize: { xs: 30, sm: 40, lg: 50 } }}
          >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>

            <Typography sx={{ fontSize: { xs: 30, sm: 40, lg: 50 } }}>
              Checkout
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      {/*End of Breadcrumbs*/}
      {/*Main Container Start Here*/}
      <Box sx={style.mainContainer}>
        <Box sx={style.suggestTitle}>
          <Typography variant="h1" sx={style.productHead}>
            Checkout
          </Typography>
        </Box>

        {user.cart.length === 0 ? (
          ""
        ) : (
          <Grid container>
            <Grid
              item
              sx={style.cartContainer}
              xs={12}
              sm={12}
              lg={user.cart.length === 0 ? 12 : 12}
            >
              <Box sx={style.cartBoxAddress}>
                <Box sx={style.mailColor} />
                <Box sx={style.cartBoxAddress1}>
                  <LocationIcon color="primary" />
                  <Typography color="primary" sx={{ ml: 1 }}>
                    {" "}
                    Delivery Address
                  </Typography>
                </Box>
                <Box sx={style.cartBoxAddress1}>
                  <Typography sx={{ ml: 1, letterSpacing: "1px" }}>
                    {" "}
                    <b>
                      {user.myuserdata.map((data) => data.UserName)} 0
                      {user.myuserdata.map((data) => data.ContactNumber)}{" "}
                    </b>{" "}
                    {user.myuserdata.map((data) => data.UserAddress)}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }} />
                  <Button>
                    {" "}
                    <b>Change</b>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )}

        <Grid container>
          <Grid
            item
            sx={style.cartContainer}
            xs={12}
            sm={12}
            lg={user.cart.length === 0 ? 12 : 7.5}
          >
            {user.cart.length === 0 ? (
              <Box sx={style.cartBox}>
                {" "}
                <Box sx={style.productDetail2}>
                  <Typography
                    color="gray"
                    sx={{ fontSize: 25, textAlign: "center" }}
                  >
                    No items in your cart or slow internet causing trouble
                    (Refresh the page)
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Box>
                {products.map((product, key) => (
                  <Box sx={style.cartBox} key={key + 1}>
                    <Box sx={style.productDetail}>
                      <Box sx={style.imageBox}>
                        <img
                          alt="asd"
                          src={product.ProductImg}
                          style={{
                            width: "120px",
                            height: "120px",
                            objectFit: "cover",
                          }}
                        />
                      </Box>

                      <Box sx={style.infoContainer}>
                        <Typography sx={style.infoText} noWrap>
                          <b>Product:</b> {product.ProductName}
                        </Typography>
                        <Typography sx={style.infoText}>
                          <b>Price:</b> {product.ProductSalePrice} / Kg
                        </Typography>
                        <Typography sx={style.infoText}>
                          <b>Product ID:</b> 2018200600
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={style.productButtonContainer}>
                      <Typography sx={style.cartQuantity}>
                        <b>Quantity</b>
                      </Typography>
                      <Box sx={style.quantityContainer}>
                        <TextField
                          InputProps={{
                            readOnly: true,
                          }}
                          sx={style.qtyInput}
                          defaultValue={
                            user.cart.map((carts) => carts.CartQty)[key]
                          }
                        />
                      </Box>
                    </Box>

                    <Box sx={style.productButtonContainer}>
                      <Typography sx={style.cartQuantity}>
                        <b>Amount</b>
                      </Typography>
                      <Typography sx={style.cartQuantity}>
                        {user.cart.map((carts) => carts.CartQty)[key] *
                          product.ProductSalePrice}
                        .00
                      </Typography>
                    </Box>
                  </Box>
                ))}{" "}
                <Box sx={style.cartBoxMessage}>
                  <Box sx={style.cartBoxMessage1}>
                    <TextField
                      label="Leave a Message to Seller"
                      variant="filled"
                      fullWidth
                      focused
                      value={message}
                      onChange={HandleChangeMessage}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
          {user.cart.length === 0 ? (
            ""
          ) : (
            <Grid item xs sx={style.summaryContainer}>
              <Box sx={style.orderSummary}>
                <Box>
                  <Typography sx={style.orderSummaryText}>
                    Order Summary
                  </Typography>
                </Box>

                <Box sx={style.orderTextContainer}>
                  <Typography sx={style.orderText1}>Subtotal:</Typography>
                  <Typography sx={style.orderText2}>
                    {" "}
                    {products
                      .map(
                        (carts, key) =>
                          carts.ProductSalePrice *
                          user.cart.map((carts) => carts.CartQty)[key]
                      )
                      .reduce(reducer)}
                    .00
                  </Typography>
                </Box>

                <Box sx={style.orderTextContainer}>
                  <Typography sx={style.orderText1}>Delivery Fee:</Typography>
                  <Typography sx={style.orderText2}>
                    {products
                      .map(
                        (product, key) =>
                          10 * user.cart.map((carts) => carts.CartQty)[key]
                      )
                      .reduce(reducer) +
                      60 * user.cart.length}
                    .00
                  </Typography>
                </Box>

                <Box sx={style.orderTextContainer}>
                  <Typography sx={style.orderText1}>Total:</Typography>
                  <Typography sx={style.orderText2}>
                    {" "}
                    {products
                      .map(
                        (carts, key) =>
                          carts.ProductSalePrice *
                          user.cart.map((carts) => carts.CartQty)[key]
                      )
                      .reduce(reducer) +
                      products
                        .map(
                          (product, key) =>
                            10 * user.cart.map((carts) => carts.CartQty)[key]
                        )
                        .reduce(reducer) +
                      60 * user.cart.length}
                    .00
                  </Typography>
                </Box>

                <Box sx={style.orderTextContainer}>
                  <Button
                    variant="contained"
                    sx={style.buttonCheckout}
                    onClick={buttonCash}
                  >
                    Cash On Delivery
                  </Button>
                </Box>

              
                <Box sx={style.orderTextContainer}>
                  {" "}
                  {checkout ? (
                    <Paypal Message={message}  />
                  ) : (
                    <Button
                    variant="contained"
                      disabled={false}
                      onClick={() => setCheckOut(true)}
                      className="btn btn-success btn-md mybtn"
                     
                      sx={style.buttonCheckout}
                    >
                      Paypal
                    </Button>
                  )}
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
      {/*Main Container End Here*/}

      <Footer />
    </Box>
  );
}
