import React, { useEffect, useState } from "react";
import style from "../styles/ShopPage";
import NavbarmainNoUser from "../components/NavbarMainNoUser";
import Navbarmain from "../components/NavbarMain";
import Footer from "../components/Footer";
import StarIcon from "@mui/icons-material/Star";
import PlaceIcon from "@mui/icons-material/Place";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import ForumIcon from "@mui/icons-material/Forum";
import AddIcon from "@mui/icons-material/Add";
import usePagination from "../components/Pagination";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Rating,
  Button,
  TextField,
  Link,
  Tab,
  Tabs,
  Card,
  CardMedia,
  CardContent,
  CardActions,

} from "@mui/material";

import cover from "../image/cover.jpg";
//import vince from '../image/vince.jpg';
//import chickenMeat from "../image/chickenMeat.jpg";

//backend
import { useLocation } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc, collection,serverTimestamp,setDoc } from "firebase/firestore";
import { db, auth } from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

const Shoppage = () => {

  const [search, setSearch] = useState("");
  const userData = useSelector((state) => state.user);
  const history = useHistory();
 // const [page, setPage] = useState(1);
  const PER_PAGE = 2;
  // const handleChangePagination = (event, newValue) => {
  //   setPage(newValue);
  //   _DATA.jump(newValue);
  // };

  const [userAuth, setUserAuth] = useState();


  const [products, setProducts] = useState([
    { ProductName: "Loading...", id: "initial" },
  ]);
  const _DATA = usePagination(products, PER_PAGE);
  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let queryy = useQuery();
  let shop = queryy.get("shop");
  
  const [shops,setShops] = useState([])

 const buttonViewProduct = (id) => {
    window.scrollTo(0, 0);
    history.push(`productdetail?product=${id}`);
  };
  const buttonAddToCart = (product) => {
    if (userAuth === null) {
      //toast.error("You need to login first");
      window.scrollTo(0, 0);

      history.push("/login");
    } else if (userAuth.uid === product.SellerUid) {
      toast.error("You cant add to cart your product");
    } else {
     // console.log("add to cart", product);

      if(userData.cart.find((item) => item.ProductId === product.id) ) {
        toast.error("This product is already on your cart.");
        return null;
      }else{ 
        
        toast.success("Successfully add to your cart")
      auth.onAuthStateChanged((user) => {
        const newCityRef = doc(collection(db, "Cart"));
        const data = {
          ProductId: product.id,
          CartQty: Number(1),
          BuyerUid: user.uid,
          SellerUid: product.SellerUid,
          CreatedDate: serverTimestamp(),
        };

        setDoc(newCityRef, data);
      });
      
     }
   }
  };
  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserAuth(user);
      
    });
    
    

    const getData = async () => {
      try {

         const docRef = doc(db, "Users", shop);
        const docSnap = await getDoc(docRef);
        setShops(docSnap.data());

        // if (docSnap.exists() && search === '') {
       

        //   const collectionRefProducts = collection(db, "Products");
        //   const qProducts = query(
        //     collectionRefProducts,
        //     where("SellerUid", "==", shop)
            
        //   );
        //   onSnapshot(qProducts, (snapshot) =>
        //     setProducts(
        //       snapshot.docs.map((doc) => ({
        //         ...doc.data(),
        //         id: doc.id,
        //       }))
        //     )
        //   );

        // setShops(userData.users.find((user) => ( 
        //   user.id === shop
        //  )) )
        

      if (search === '') {
       

        setProducts(userData.products.filter((product) => ( 
         product.SellerUid === shop
        )) )
      } else {
          //toast.error("No Product Dispaly");
          setProducts(userData.products.filter((product) => ( 
            product.ProductName.toLowerCase().includes(search.toLowerCase()) && product.SellerUid === shop
          )) )
        }
      //  console.log("Document data:", docSnap.data());
      } catch (error) {
        console.log("error", error);
      }
    };
  console.log("search",search)
    getData();
    // console.log("shops",shops)
  }, [shop,search,userData]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <span>{children}</span>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        //theme="dark"
      />

      {userAuth === null ? <NavbarmainNoUser /> : <Navbarmain />}

      {/*Store Cover Page*/}
      <Box sx={style.coverPhoto}>
        <img
          alt="coverphoto"
          src={cover}
          style={{
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            width: "100%",
            maxHeight: "30vh",
          }}
        />
      </Box>
      <Box sx={style.sellerProfileContainer}>
        <Grid container sx={style.gridStoreContainer} spacing={3}>
          <Grid item sx={style.gridItemStore1}>
            <Avatar
              alt="store profile picture"
              src={shops.ProfileImg}
              sx={style.storePicture}
            />
          </Grid>

          <Grid item sx={style.gridItemStore2} xs>
            <Typography sx={style.storeName}>{shops.ShopName}</Typography>
            <Rating
              readOnly
              value={4}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              sx={style.productRating}
            />

            <Box sx={style.storeAddress}>
              <PlaceIcon sx={style.icon} />
              <Typography sx={style.storeAddressText}>
                {shops.PickUpAddress}
              </Typography>
            </Box>

            <Box sx={style.storeAddress}>
              <PhoneIcon sx={style.icon} />
              <Typography sx={style.storeAddressText}>0923 144 0893</Typography>
            </Box>

            <Box sx={style.storeAddress}>
              <EmailIcon sx={style.icon} />
              <Typography sx={style.storeAddressText}>
                bryceangel.ganotice.a@bulsu.edu.ph
              </Typography>
            </Box>
          </Grid>

          <Grid item sx={style.chatContainer} xs>
            <Box sx={style.buttonHolder}>
              <Button variant="contained" sx={style.followButton}>
                <AddIcon style={{ marginRight: "10px", fontSize: "18px" }} />
                Follow Seller
              </Button>

              <Button variant="contained" sx={style.chatButton}>
                <ForumIcon style={{ marginRight: "10px", fontSize: "18px" }} />
                Chat Seller
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/*Main Body*/}
      <Box>
        <Grid container>
          <Grid
            item
            sx={style.leftContainerGrid}
            xs={12}
            sm={12}
            md={4}
            lg={2.5}
            xl={2}
          >
            <Box sx={style.leftContainer}>
              <Typography sx={style.searchText}>Search</Typography>
              <TextField
                variant="outlined"
                sx={style.searchProduct}
                placeholder="Search Product"
                value={search}
                onChange={handleChangeSearch}
              />

              <Typography sx={style.productAllCategories}>
                ALL CATEGORIES
              </Typography>
              <Link href="#" underline="none">
                <Typography sx={style.productCategory}>Vegetables</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.productCategory}>Fruits</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.productCategory}>Meat</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.productCategory}>Poultry</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.productCategory}>Seafood</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.productCategory}>Rice</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.productCategory}>Others</Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item xs>
            <Box sx={style.storeContentContainer}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={style.tabMain}
                variant="scrollable"
                allowScrollButtonsMobile
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "transparent",
                  },
                }}
              >
                <Tab
                  disableRipple
                  label="Product"
                  {...a11yProps(0)}
                  sx={style.productTabs}
                />
                <Tab
                  disableRipple
                  label="About Store"
                  {...a11yProps(1)}
                  sx={style.productTabs}
                />
              </Tabs>

              {/*Products*/}
              <TabPanel
                value={value}
                index={0}
                style={{
                  backgroundColor: "#f5f5f5",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid container sx={style.storeProductContainer}>
                  {/*Card 1*/}
                 {_DATA.currentData().map((product, key) => (
                <Grid item sx={style.gridCard} key={key + 1}>
                  {/*Card*/}

                  <Box sx={style.sliderBox}>
                    <Card sx={style.cardWrapper}>
                      <CardMedia
                        component="img"
                        height="130"
                        image={product.ProductImg}
                        alt="Chicken Meat"
                        onClick={() => buttonViewProduct(product.id)}
                      />
                      <CardContent
                        onClick={() => buttonViewProduct(product.id)}
                      >
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
                      <CardActions>
                        <Button
                        fullWidth
                         sx={style.cardButton1}
                          variant="contained"
                          onClick={() => buttonAddToCart(product)}
                        >
                          Add to Cart
                        </Button>
                      </CardActions>
                    </Card>
                  </Box>
                </Grid>
              ))}
                     
                </Grid>
              </TabPanel>

              {/*About Store*/}
              <TabPanel
                value={value}
                index={1}
                style={{ backgroundColor: "#f5f5f5" }}
              >
                <Box sx={style.whiteContainer1}>
                  <Typography sx={style.textTitle1}>Who we are?</Typography>
                  <Typography sx={style.textContent1}>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Optio et eveniet reprehenderit fugiat sequi. Asperiores
                    labore fugit a ipsum saepe accusantium dolorum similique
                    natus officia consequatur, quis, magnam quod laboriosam!
                  </Typography>
                </Box>
              </TabPanel>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Shoppage;
