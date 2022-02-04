import React, { useEffect, useState } from "react";
import Navbarmain from "../components/NavbarMain";
import NavbarmainNoUser from "../components/NavbarMainNoUser";
import Footer from "../components/Footer";
import style from "../styles/Shop";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Rating,
  CardActions,
  Button,
  TextField,
  Link,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Breadcrumbs,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
//import bryce from "../image/bryce.jpg";
//import chickenMeat from "../image/chickenMeat.jpg";
import beef from "../image/beef.jpg";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SearchIcon from "@mui/icons-material/Search";
import { useHistory } from "react-router-dom";
//import { useLocation } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

//backend
import { onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import {

  collection,
  serverTimestamp,
  setDoc,
  doc,
} from "firebase/firestore";
import { findProduct } from "../redux/actions/userAction";


const Shop = () => {
  
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [userAuth, setUserAuth] = useState({});
  const [search, setSearch] = useState("");
  const [fetchSearch, setFetchSearch] = useState("");
  const [searchProducts, setSearchProducts] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [fetchMaxPrice, setFetchMaxPrice] = useState(0);
  const [fetchMinPrice, setFetchMinPrice] = useState(0);
  //const [userDetails, setUserDetails] = useState([]);

  //   const user = useSelector((state) => state.user);
  //   const dispatch = useDispatch();

  const handleChangeSearch = (event) => {
    setSearch(event.target.value);
  };
  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value);
  };
  const handleChangeMaxPrice = (event) => {
    setMaxPrice(event.target.value);
  };

  const buttonSearch = () => {
    setFetchSearch(search);
  };
  const buttonPrice = () => {
    setFetchMaxPrice(maxPrice);
    setFetchMinPrice(minPrice);
  };
  const buttonViewProduct = (id) => {
    history.push(`productdetail?product=${id}`);
    dispatch(findProduct(id));
  };
  const buttonAddToCart = (product) => {

    if (userAuth === null) {
      toast.error("You need to login first");
      history.push("/login");
    } else if (userAuth.uid === product.SellerUid) {
      toast.error("You cant add to cart your product");
    }else{
      if(userData.cart.find((item) => item.ProductId === product.id) ) {
        toast.error("This product is already on your cart.");
        return null;
      }else{ 
        console.log("Product Id", product.id)
        toast.success("Successfully add to your cart")
      auth.onAuthStateChanged((user) => {
        const newCityRef = doc(collection(db, "Cart"));
        const data = {
          Uid: newCityRef.id,
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

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserAuth(user);
    });

   
    if (fetchMaxPrice > 0 || fetchMinPrice > 0 || !fetchSearch === "" ) {
      setSearchProducts(userData.products.filter((product) => ( 
        product.ProductName.toLowerCase().includes(fetchSearch.toLowerCase()) && product.ProductSalePrice <= fetchMaxPrice && product.ProductSalePrice >= fetchMinPrice
      )) )
    } else if (search === "") {
      setSearchProducts(userData.products)
    } else {
      setSearchProducts(userData.products.filter((product) => ( 
        product.ProductName.toLowerCase().includes(fetchSearch.toLowerCase()) 
      )) )
    }

    // const collectionRefProducts = collection(db, "Products");
    // const qProducts = query(
    //   collectionRefProducts,
    //   orderBy("ProductName"),
    //   startAt(fetchSearch.charAt(0).toUpperCase() + fetchSearch.slice(1)),
    //   endAt(fetchSearch + "\uf8ff")
    // );
    // onSnapshot(qProducts, (snapshot) =>
    //   setSearchProducts(
    //     snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //   )
    // );

    // if (fetchMaxPrice > 0) {
    //   const qProducts = query(
    //     collectionRefProducts,
    //     where("ProductSalePrice", "<=", Number(fetchMaxPrice)),
    //     orderBy("ProductSalePrice")
    //   );
    //   onSnapshot(qProducts, (snapshot) =>
    //     setSearchProducts(
    //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     )
    //   );
    // } else if (fetchMinPrice > 0) {
    //   const qProducts = query(
    //     collectionRefProducts,

    //     where("ProductSalePrice", ">=", Number(fetchMinPrice)),
    //     orderBy("ProductSalePrice")
    //   );
    //   onSnapshot(qProducts, (snapshot) =>
    //     setSearchProducts(
    //       snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     )
    //   );
    // }

    // console.log(fetchSearch.charAt(0).toUpperCase() + fetchSearch.slice(1));
    // console.log(fetchMaxPrice);
  }, [fetchSearch, fetchMaxPrice, fetchMinPrice, userData,search]);

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

      {/*Container to ng Breadcrumbs*/}
      <Box sx={style.breadCrumbsContainer}>
        <Box sx={{alignItems: 'center', display: 'flex',
        flexDirection: 'column',paddingTop: {xs:'130px',lg:"100px"},}}>
        <Breadcrumbs aria-label="breadcrumb"  sx={{fontSize:{xs:30,sm:40,lg:50}}}>
          <Link underline="hover" color="inherit" href="/"  >
            Home
          </Link>
    
          <Typography   sx={{fontSize:{xs:30,sm:40,lg:50}}} >Shop</Typography>
        </Breadcrumbs>

        </Box>
      
      </Box>
      {/*End of Breadcrumbs*/}

      {/*Main Body na naka Grid*/}
      <Box sx={style.mainGridContainer}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={12}
            md={8}
            lg={9.0}
            xl={9.2}
            sx={style.productGrid}
          >
            <Box sx={style.grid1}>
              <Box sx={style.selectContainer}>
                <Box sx={style.searchContainer}>
                  <Typography sx={style.sortText}>Search: </Typography>

                  <TextField
                    placeholder="Search Product Here"
                    sx={style.searchBar}
                    value={search}
                    onChange={handleChangeSearch}
                  />

                  <Button
                    variant="contained"
                    sx={style.searchProduct}
                    onClick={buttonSearch}
                  >
                    <SearchIcon />
                  </Button>
                </Box>
              </Box>
            </Box>

            {/*JUST FOR YOU*/}

            <Box sx={{ width: "100%" }}>
              <Typography sx={style.productTitle}>Just For You</Typography>
            </Box>

            <Grid container sx={style.gridContainerCard}>
              {searchProducts.map((product, key) => (
                <Grid item sx={style.cardItem2} key={key+1}>
                  <Card sx={style.cardWrapper}>
                    <CardMedia
                      component="img"
                      height="120"
                      image={product.ProductImg}
                      alt="Chicken Meat"
                      onClick={() => buttonViewProduct(product.id)}
                    />
                    <CardContent onClick={() => buttonViewProduct(product.id)}>
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
                        variant="contained"
                        sx={style.cardButton1}
                        onClick={(e) => buttonAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>

            <Box sx={style.loadButtonContainer}>
              <Button variant="outlined" sx={style.loadMoreButton}>
                Load More
              </Button>
            </Box>
          </Grid>

          <Grid item xs sx={style.optionGrid}>
            <Box sx={style.boxCategory}>
              <Typography sx={style.allCategoryTitle}>ALL CATEGORY</Typography>
              <Link href="#" underline="none">
                <Typography sx={style.allCategoryItems}>Vegetables</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.allCategoryItems}>Fruits</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.allCategoryItems}>Meat</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.allCategoryItems}>Poultry</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.allCategoryItems}>Seafood</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.allCategoryItems}>Rice</Typography>
              </Link>
              <Link href="#" underline="none">
                <Typography sx={style.allCategoryItems}>Others</Typography>
              </Link>

              <Typography sx={style.allCategoryTitle}>PRICE</Typography>

              <Box sx={style.priceRange}>
                <TextField
                  placeholder="Min"
                  type="number"
                  variant="outlined"
                  sx={style.min}
                  value={minPrice}
                  onChange={handleChangeMinPrice}
                />

                <TextField
                  placeholder="Max"
                  type="number"
                  variant="outlined"
                  sx={style.max}
                  value={maxPrice}
                  onChange={handleChangeMaxPrice}
                />

                <Button
                  variant="contained"
                  sx={style.searchPriceButton}
                  onClick={buttonPrice}
                >
                  <PlayArrowIcon sx={style.playIcon} />
                </Button>
              </Box>

              <Typography sx={style.allCategoryTitle}>RATING</Typography>
            </Box>

            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox sx={style.checkBoxChoices} />}
                  label="5 Stars"
                  sx={style.checkBoxLabel}
                />
                <FormControlLabel
                  control={<Checkbox sx={style.checkBoxChoices} />}
                  label="4 Stars"
                  sx={style.checkBoxLabel}
                />
                <FormControlLabel
                  control={<Checkbox sx={style.checkBoxChoices} />}
                  label="3 Stars"
                  sx={style.checkBoxLabel}
                />
                <FormControlLabel
                  control={<Checkbox sx={style.checkBoxChoices} />}
                  label="2 Stars"
                  sx={style.checkBoxLabel}
                />
                <FormControlLabel
                  control={<Checkbox sx={style.checkBoxChoices} />}
                  label="1 Star"
                  sx={style.checkBoxLabel}
                />
              </FormGroup>
            </Box>

            <Typography sx={style.allCategoryTitle}>JUST FOR YOU</Typography>

            <Box sx={style.productWrapper}>
              <Card sx={style.cardProductItem}>
                <Box sx={style.suggestCardWrapper}>
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    image={beef}
                    sx={style.cardMediaWidth}
                  />

                  <CardContent>
                    <Typography sx={style.suggestedStoreName}>
                      Bryce Ganotice's Store
                    </Typography>
                    <Typography sx={style.suggestedProductName}>
                      Ground Beef
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
                    <Typography sx={style.suggestedProductPrice}>
                      Php. 300.00 / Kilo
                    </Typography>
                  </CardContent>
                </Box>
              </Card>

              <Card sx={style.cardProductItem}>
                <Box sx={style.suggestCardWrapper}>
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    image={beef}
                    sx={style.cardMediaWidth}
                  />

                  <CardContent>
                    <Typography sx={style.suggestedStoreName}>
                      Bryce Ganotice's Store
                    </Typography>
                    <Typography sx={style.suggestedProductName}>
                      Ground Beef
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
                    <Typography sx={style.suggestedProductPrice}>
                      Php. 300.00 / Kilo
                    </Typography>
                  </CardContent>
                </Box>
              </Card>

              <Card sx={style.cardProductItem}>
                <Box sx={style.suggestCardWrapper}>
                  <CardMedia
                    component="img"
                    alt="Product Image"
                    image={beef}
                    sx={style.cardMediaWidth}
                  />

                  <CardContent>
                    <Typography sx={style.suggestedStoreName}>
                      Bryce Ganotice's Store
                    </Typography>
                    <Typography sx={style.suggestedProductName}>
                      Ground Beef
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
                    <Typography sx={style.suggestedProductPrice}>
                      Php. 300.00 / Kilo
                    </Typography>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/*End of Main Body*/}

      <Footer />
    </Box>
  );
};

export default Shop;
