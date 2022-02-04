import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  Card,
  CardMedia,
  CardContent,
  Rating,
  CardActions,
  MenuItem,
  Modal,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import style from "../styles/Cart";
import Navbarmain from "../components/NavbarMain";
import Footer from "../components/Footer";
//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarIcon from "@mui/icons-material/Star";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import {
  where,
  collection,
  query,
  onSnapshot,
  documentId,
  doc,
  updateDoc,
  serverTimestamp,
  increment,
  deleteDoc,
  getDoc,
  setDoc,
  orderBy,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, auth, storage } from "../utils/firebase";

const Cart = () => {
  //const [checkout, setCheckOut] = useState(false);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([{ id: "initial" }]);
  const reducer = (previousValue, currentValue) => previousValue + currentValue;
  const [userAuth, setUserAuth] = useState([
    {
      uid: "initial",
    },
  ]);
  const [userName, setUserName] = React.useState("");
  const [barangay, setBarangay] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState(0);
  const [houseNumber, setHouseNumber] = React.useState(0);
  const [munipality, setMunicipality] = React.useState("Candaba");
  const [province, setProvince] = React.useState("Pampanga");
  const date = new Date();
  const [userImg, setUserImg] = useState(null);
  const [, setError] = useState("");
  const [modalNewAccount, setModalNewAccount] = useState(false);

  const CHARACTER_LIMIT = 50;
  const PHONE_LIMIT = 11;
  const HOUSE_LIMIT = 5;
  const types = ["image/png", "image/jpeg"]; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setUserImg(selectedFile);
      setError("");
    } else {
      setUserImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  //handle Change
  //const [textfieldValue, settextfieldValue] = React.useState(1);
  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeBarangay = (event) => {
    setBarangay(event.target.value);
  };
  const handleChangeMunicipality = (event) => {
    setMunicipality(event.target.value);
  };
  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
  };
  const handleChangePhone = (event) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === "" || re.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
  };
  const handleChangeHouse = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setHouseNumber(event.target.value);
    }
  };

  // button chat
  const buttonModalBack = () => {
    setModalNewAccount(false);
  };
  const buttonModalSave = () => {
    const ph = "Philippines";

    if (
      userName === "" ||
      houseNumber === 0 ||
      barangay === "" ||
      userImg === null ||
      phoneNumber === 0
    ) {
      toast.error("All Field Required");
    } else {
      onAuthStateChanged(auth, (user) => {
        const storageRef = ref(
          storage,
          `users-images/${date.toLocaleTimeString() + userImg.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, userImg, types);

        // const uploadTask = ref(storage, `product-images/${productImg.name}`).put(productImg);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (err) => setError(err.message),
          () => {
            //  const UserDocRef = doc(collection(db, "Products"));
            var UserDocRef = doc(db, "Users", user.uid);
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setDoc(UserDocRef, {
                UserUid: user.uid,
                UserEmail: user.email,
                ProfilePicName: date.toLocaleTimeString() + userImg.name,
                UserName: userName,
                UserAddress:
                  Number(houseNumber) +
                  " " +
                  barangay +
                  " " +
                  province +
                  " " +
                  ph,
                ProfileImg: url,
                UserType: "Buyer",
                ContactNumber: Number(phoneNumber),
                CreatedDate:
                  date.toLocaleDateString() + " " + date.toLocaleTimeString(),
              })
                .then(() => {
                  setUserName("");
                  setPhoneNumber("");
                  setHouseNumber("");
                  setBarangay("");

                  setError("");
                  document.getElementById("file").value = "";
                  toast.success(" Your Account has been successfully created");
                  setTimeout(() => {}, 3000);
                })
                .catch((err) => setError(err.message));
            });
          }
        );
      });
    }
  };

  const incButton = (id) => {
    console.log("increment", id);
    const docRef = doc(db, "Cart", id);
    const payload = { CartQty: increment(1), UpdateDate: serverTimestamp() };
    updateDoc(docRef, payload);
  };
  const decButton = (id) => {
    console.log("decrement", id);
    const docRef = doc(db, "Cart", id);
    const payload = { CartQty: increment(-1), UpdateDate: serverTimestamp() };
    updateDoc(docRef, payload);
  };
  const buttonRemove = (id) => {
    console.log("delete", id);
    console.log("product", products);
    deleteDoc(doc(db, "Cart", id));
  };

  const buttonPayNow = () => {
    console.log("prodoucts", products);
    // const qty = user.cart.map((carts) => carts.CartQty);
    // const img = products.map((product) => product.ProductImg);
    // console.log("checkout",products)
    // auth.onAuthStateChanged(async(user) => {

    //      // {
    //   //   products.map(async(product, key) =>

    //   //    await addDoc(collection(db, "Checkout"), {
    //   //     ProductId: product.id,
    //   //     ProductImage: product.ProductImg,
    //   //     ProductName: product.ProductName,
    //   //     ProductPrice: product.ProductSalePrice,
    //   //    // ProductQty: user.cart.map((carts) => carts.CartQty)[key],
    //   //     BuyerUid: user.uid,
    //   //   })

    //   //   )}

    //   await setDoc(doc(db, "Checkout", user.uid), {
    //     ProductId: products.map((product) => product.id),
    //     //ProductImg: img,
    //     ProductName: products.map((product) => product.ProductName),
    //     ProductPrice: products.map((product) => product.ProductSalePrice),
    //     ProductQty: qty,
    //     BuyerUid: user.uid,
    //     SellerUid: products.map((product) => product.SellerUid),

    //   });

    //   history.push("/checkout")

    // });
    if (userAuth === null) {
      toast.error("You need to login first");
      history.push("/login");
    } else {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setModalNewAccount(false);
            console.log("data exist");
            history.push("/checkout");
          } else {
            setModalNewAccount(true);
            console.log("not exist");
            console.log(user.email);
          }
        }
      });
    }
  };

  const buttonContinueShopping = () => {
    history.push("/shop");
  };
  const handleChangeQuantity = (event, id) => {
    //  console.log(event.target.value)

    const docRef = doc(db, "Cart", id);
    const payload = {
      CartQty: Number(event.target.value),
      UpdateDate: serverTimestamp(),
    };
    updateDoc(docRef, payload);
  };

  useEffect(() => {
    // console.log(user.cart);
    // console.log(user.cart.map((carts) => carts.ProductId));

    onAuthStateChanged(auth, async (user) => {
      setUserAuth(user);
    });

    const fetchData = () => {
      if (user.cart.length >= 1) {
        const id = user.cart.map((carts) => carts.ProductId);
        const uid = user.cart.map((carts) => carts.id);
        const qty = user.cart.map((carts) => carts.CartQty);
        console.log("Cart", id);

        const collectionRefCart = collection(db, "Products");
        const qCart = query(
          collectionRefCart,
          where(documentId(), "in", id),
          orderBy(documentId())
        );
        onSnapshot(qCart, (snapshot) =>
          setProducts(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              ProductId: uid,
              Cart: qty,
            }))
          )
        );

        // const product = user.products.filter((product) =>  product.id === id );
        // setProducts( product.map((product) => ({ ...product.data(),  ProductId: id , Cart: qty,}) ))
      } else {
        return null;
      }
    };
    // console.log("cart", user.cart);
    fetchData();
  }, [user]);

  return (
    <Box sx={{ backgroundColor: "#ededed" }}>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbarmain />
      {/*Modal if new user */}

      <Modal
        open={modalNewAccount}
        //onClose={handleClose}
      >
        <Box sx={style.modalBox}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="textPrimary"
          >
            Setting up your account!
          </Typography>

          <TextField
            multiline
            variant="filled"
            size="small"
            fullWidth
            label="Name"
            inputProps={{
              maxlength: CHARACTER_LIMIT,
            }}
            value={userName}
            helperText={`${userName.length}/${CHARACTER_LIMIT}`}
            onChange={handleChangeName}
            margin="normal"
          />

          <TextField
            sx={{ mb: 1 }}
            size="small"
            multiline
            variant="filled"
            fullWidth
            label="Contact Number"
            inputProps={{
              type: "number",
              maxlength: PHONE_LIMIT,
            }}
            value={phoneNumber}
            helperText={`${phoneNumber.toString().length}/${PHONE_LIMIT}`}
            onChange={handleChangePhone}
          />

          <TextField
            sx={{ mb: 1 }}
            size="small"
            multiline
            variant="filled"
            fullWidth
            label="House Number"
            inputProps={{
              maxlength: HOUSE_LIMIT,
            }}
            value={houseNumber}
            helperText={`${houseNumber.toString().length}/${HOUSE_LIMIT}`}
            onChange={handleChangeHouse}
          />

          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth variant="filled" size="small">
              <InputLabel id="demo-simple-select-label">Barangay</InputLabel>
              <Select
                sx={style.labelSelect}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={barangay}
                label="Barangay"
                onChange={handleChangeBarangay}
              >
                <MenuItem value={"Bahay Pare"}>Bahay Pare</MenuItem>
                <MenuItem value={"Bambang"}>Bambang</MenuItem>
                <MenuItem value={"Barangca"}>Barangca</MenuItem>
                <MenuItem value={"Buas (Poblacion)"}>Buas (Poblacion)</MenuItem>
                <MenuItem value={"Cuayang Bugtong"}>Cuayang Bugtong</MenuItem>
                <MenuItem value={"Dulong Ilog"}>Dulong Ilog</MenuItem>
                <MenuItem value={"Gulap"}>Gulap</MenuItem>
                <MenuItem value={"Lanang"}> Lanang </MenuItem>
                <MenuItem value={"Magumbali"}> Magumbali</MenuItem>
                <MenuItem value={"Mandasig"}>Mandasig</MenuItem>
                <MenuItem value={"Mandili"}>Mandili</MenuItem>
                <MenuItem value={"Mangga"}> Mangga </MenuItem>
                <MenuItem value={"Mapaniqui"}> Mapaniqui </MenuItem>
                <MenuItem value={"Paligui"}> Paligui </MenuItem>

                <MenuItem value={"Pangclara"}>Pangclara</MenuItem>
                <MenuItem value={"Pansinao"}>Pansinao</MenuItem>
                <MenuItem value={"Paralaya (Poblacion)"}>
                  Paralaya (Poblacion)
                </MenuItem>
                <MenuItem value={"Pasig"}>Pasig</MenuItem>
                <MenuItem value={"Pescadores (Poblacion)"}>
                  Pescadores (Poblacion)
                </MenuItem>
                <MenuItem value={"Pulong Gubat"}>Pulong Gubat</MenuItem>
                <MenuItem value={"Pulong Palazan"}>Pulong Palazan</MenuItem>
                <MenuItem value={"Salapungan"}> Salapungan </MenuItem>
                <MenuItem value={"San Agustin (Poblacion)"}>
                  {" "}
                  San Agustin (Poblacion)
                </MenuItem>
                <MenuItem value={"Santo Rosario"}>Santo Rosario</MenuItem>
                <MenuItem value={"Tagulod"}>Tagulod</MenuItem>
                <MenuItem value={"Talang"}> Talang </MenuItem>
                <MenuItem value={"Tenejero"}> Tenejero </MenuItem>
                <MenuItem value={"Vizal San Pablo"}> Vizal San Pablo </MenuItem>
                <MenuItem value={"Vizal Santo Cristo"}>
                  {" "}
                  Vizal Santo Cristo{" "}
                </MenuItem>
                <MenuItem value={"Vizal Santo Niño"}>
                  {" "}
                  Vizal Santo Niño
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 300, mt: 3 }}>
            <FormControl fullWidth variant="filled" size="small">
              <InputLabel id="demo-simple-select-disabled-label">
                Municipality
              </InputLabel>
              <Select
                value={munipality}
                label="Municipality"
                onChange={handleChangeMunicipality}
                inputProps={{ readOnly: true }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Candaba"}>Candaba</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 300, mt: 3 }}>
            <FormControl fullWidth variant="filled" size="small">
              <InputLabel id="demo-simple-select-disabled-label">
                Province
              </InputLabel>
              <Select
                value={province}
                label="Province"
                onChange={handleChangeProvince}
                inputProps={{ readOnly: true }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Pampanga"}>Pampanga</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Box sx={{ mt: 3, backgroundColor: "gray", height: "100%" }}>
                {/** 
                <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
                  <Button>Upload Product Image</Button>
                </Box>
              </Box>
                */}
                <Typography
                  sx={{ m: 1 }}
                  color="textPrimary"
                  fontSize="caption"
                >
                  Select your Agrishop Profile Picture
                </Typography>
                <Box sx={{ ml: 1 }}>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    required
                    onChange={productImgHandler}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={buttonModalBack}
            sx={{ mt: 2, backgroundColor: "#EE4B2B" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={buttonModalSave}
            sx={{ mt: 2, ml: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* End of Modal *?}

      {/*Container to ng Breadcrumbs*/}
      <Box sx={style.breadCrumbsContainer}></Box>
      {/*End of Breadcrumbs*/}

      {/*Main Container Start Here*/}
      <Box sx={style.mainContainer}>
        <Box sx={style.suggestTitle}>
          <Typography variant="h1" sx={style.productHead}>
            Cart
          </Typography>
        </Box>

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
                        <Button
                          variant="contained"
                          sx={style.removeButton}
                          onClick={() =>
                            buttonRemove(
                              user.cart.map((carts) => carts.id)[key]
                            )
                          }
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>

                    <Box sx={style.productButtonContainer}>
                      <Typography sx={style.cartQuantity}>
                        <b>Quantity</b>
                      </Typography>
                      <Box sx={style.quantityContainer}>
                        <Button
                          variant="contained"
                          sx={style.lessButton}
                          onClick={(event) => {
                            if (
                              user.cart.map((carts) => carts.CartQty)[key] > 1
                            ) {
                              decButton(
                                user.cart.map((carts) => carts.id)[key]
                              );
                            } else {
                              toast.error(
                                "There have atleast 1 quantity for this item"
                              );
                            }
                          }}
                        >
                          -
                        </Button>
                        <TextField
                          sx={style.qtyInput}
                          defaultValue={
                            user.cart.map((carts) => carts.CartQty)[key]
                          }
                          onKeyPress={(event) => {
                            if (event.key === "Enter") {
                              // alert(event.target.value);
                              if (
                                product.ProductQuantity >= event.target.value
                              ) {
                                if (event.target.value <= 0) {
                                  toast.error(
                                    "There have atleast 1 quantity for this item"
                                  );
                                } else {
                                  handleChangeQuantity(
                                    event,
                                    user.cart.map((carts) => carts.id)[key]
                                  );
                                }
                              } else {
                                toast.error(
                                  "There are only " +
                                    product.ProductQuantity +
                                    " quantity remaining for this item "
                                );
                              }
                            }
                          }}
                        />
                        <Button
                          variant="contained"
                          sx={style.addButton}
                          onClick={(event) => {
                            if (
                              product.ProductQuantity >
                              user.cart.map((carts) => carts.CartQty)[key]
                            ) {
                              incButton(
                                user.cart.map((carts) => carts.id)[key]
                              );
                            } else {
                              toast.error(
                                "There are only " +
                                  product.ProductQuantity +
                                  " quantity remaining for this item "
                              );
                            }
                          }}
                        >
                          +
                        </Button>
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
              </Box>
            )}

            <Box sx={style.shoppingButtonContainer}>
              <Button
                variant="contained"
                sx={style.continueShoppingButton}
                onClick={buttonContinueShopping}
              >
                Continue Shopping
              </Button>
            </Box>
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
                  {/* <Typography sx={style.orderText2}>
                    {products.map((product, key) =>
                      10 *
                      user.cart.map((carts) => carts.CartQty)[key]
                    )
                      .reduce(reducer) + (60 * (products.filter(product => product.SellerUid !== products.reverse().map(product => product.SellerUid)).length  
                   ) === 0 ? 60 : 60 * (products.filter(product => product.SellerUid !== products.reverse().map(product => product.SellerUid)).length 
                       ) - (products.filter((product) => product.SellerUid === products.reverse().map((product) => product.SellerUid)).length 
                       ) ) }.00</Typography> */}

                  <Typography sx={style.orderText2}>
                    {products
                      .map(
                        (product, key) =>
                          10 * user.cart.map((carts) => carts.CartQty)[key]
                      )
                      .reduce(reducer) + (60 * user.cart.length)}
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
                      .reduce(reducer) + (60 * user.cart.length)}
                    .00
                  </Typography>
                </Box>

                <Box sx={style.orderTextContainer}>
                  <Button
                    variant="contained"
                    sx={style.buttonCheckout}
                    onClick={buttonPayNow}
                  >
                    Pay Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          )}
        </Grid>

        <Box sx={style.suggestTitle}>
          <Typography variant="h1" sx={style.productHead}>
            {" "}
            Suggested Products
          </Typography>
        </Box>

        <Box>
          <Grid container sx={style.mainGridContainer}>
            {user.products.map((product, key) => (
              <Grid item sx={style.gridCard} key={key + 1}>
                {/*Card*/}
                <Box sx={style.sliderBox}>
                  <Card sx={style.cardWrapper}>
                    <CardMedia
                      component="img"
                      height="130"
                      image={product.ProductImg}
                      alt="Chicken Meat"
                    />
                    <CardContent>
                      <Typography sx={style.cardTitle} noWrap>
                        {product.ProductName}
                      </Typography>
                      <Rating
                        readOnly
                        value={4}
                        sx={style.cardStars}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Typography sx={style.retailTag}>Retail</Typography>
                      <Typography sx={style.cardPrice}>
                        Php. {product.ProductSalePrice}.00 / Kilo
                      </Typography>
                    </CardContent>
                    <CardActions sx={style.buttonContainer}>
                      <Button variant="contained" sx={style.cardButton1}>
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
      {/*Main Container End Here*/}

      <Footer />
    </Box>
  );
};

export default Cart;
