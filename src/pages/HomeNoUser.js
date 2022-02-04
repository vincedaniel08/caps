import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  Grid,
  Avatar,
  Pagination,
} from "@mui/material";

import easyorder from "../image/easyorder.png";
import fresh from "../image/fresh.png";
import affordable from "../image/affordable.png";
import style from "../styles/Home";
import NavbarmainNoUser from "../components/NavbarMainNoUser";
import Footer from "../components/Footer";
import StarIcon from "@mui/icons-material/Star";

//import bryce from "../image/bryce.jpg";

import aissa from "../image/aissa.jpg";

import usePagination from "../components/Pagination";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import deliver from "../assets/images/deliver.png";
import banner2 from "../assets/images/banner2.jpg";
import banner3 from "../assets/images/banner3.jpg";

import "react-awesome-slider/dist/styles.css";
import AwesomeSlider from "react-awesome-slider";

import { useHistory } from "react-router-dom";

//toast
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//backend
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
// import {

//   collection,
//   query,
//   onSnapshot,
//   orderBy,
// } from "firebase/firestore";

const HomeNoUser = () => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 2;
  const handleChangePagination = (event, newValue) => {
    setPage(newValue);
    _DATA.jump(newValue);
  };
  const userData = useSelector((state) => state.user);
  const history = useHistory();
  const [userAuth, setUserAuth] = useState({});
  const [value, setValue] = useState(0);
  //const [products, setProducts] = useState([]);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const _DATA = usePagination(userData.products, PER_PAGE);

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
  const bgImageSlider = {
    slide1: {
      backgroundImage: `url(${banner3})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    slide2: {
      backgroundImage: `url(${banner2})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 7000,
}

  // const settingsParallax = {
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   arrows: false,
  // };
  const buttonViewProduct = (id) => {
    window.scrollTo(0, 0);
    history.push(`productdetail?product=${id}`);
  };
  const buttonAddToCart = (id) => {
    if (userAuth === null) {
      //toast.error("You need to login first");
      window.scrollTo(0, 0);

      history.push("/login");
    } else if (userAuth.uid === id) {
      toast.error("You cant add to cart your product");
    }
  };

  useEffect(() => {
    // setProducts(user.products)

    try {
      onAuthStateChanged(auth, (user) => {
        setUserAuth(user);
      });
    } catch (error) {
      console.log(error);
    }

    // const fetchData =  () => {
    // const collectionRefProducts = collection(db, "Products");
    // const qProducts = query(collectionRefProducts, orderBy("ProductName"));

    // onSnapshot(qProducts, (snapshot) =>
    //   setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    // );
    // //console.log("gago");

    // }

    // fetchData();

    // let mounted = true;
    // fetchData();
    // return () => {
    //     mounted = false; }
  }, []);

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
      <NavbarmainNoUser />

      {/*Banner*/}
      <Box sx={style.bannerSliderContainer}>
        <AwesomeSlider className="aws-btn">
          <Box style={bgImageSlider.slide1}>
            <Typography sx={style.tagLine2}>AGRISHOP!</Typography>
            <Typography sx={style.tagLine1}>
              Delivering Happiness and Needs
            </Typography>
          </Box>
          <Box style={bgImageSlider.slide2}>
            <Typography sx={style.tagLine2}>AGRISHOP!</Typography>
            <Typography sx={style.tagLine1}>
              Delivering Happiness and Needs
            </Typography>
          </Box>
        </AwesomeSlider>
      </Box>
      {/*End Of Banner*/}

      {/*Offer*/}
      <Box sx={style.offerContainer}>
        <Grid container spacing={1}>
          <Grid item xs>
            <Box sx={style.designImg1}>
              <Box component="span">
                <Typography sx={style.offerText1}>
                  All Good and Fresh Products
                </Typography>
                <Typography sx={style.offerText2}>
                  Fresh and Quick Delivery
                </Typography>
              </Box>
              <Box sx={style.offer1} />
            </Box>
          </Grid>
          <Grid item xs>
            <Box sx={style.designImg2}>
              <Box component="span">
                <Typography sx={style.offerText1}>
                  All Good and Fresh Products
                </Typography>
                <Typography sx={style.offerText2}>
                  Fresh and Quick Delivery
                </Typography>
              </Box>
              <Box sx={style.offer2} />
            </Box>
            <Box sx={style.designImg3}>
              <Box component="span">
                <Typography sx={style.offerText1}>
                  All Good and Fresh Products
                </Typography>
                <Typography sx={style.offerText2}>
                  Fresh and Quick Delivery
                </Typography>
              </Box>
              <Box sx={style.offer3} />
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/*End Of Offer*/}

      {/*Tabbed Products*/}
      <Box sx={style.suggestTitle}>
        <Typography variant="h1" sx={style.productHead}>
          {" "}
          Our Products
        </Typography>
      </Box>

      <Box sx={style.tabContainer}>
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
            label="Popular"
            {...a11yProps(0)}
            sx={style.productTabs}
          />
          <Tab
            disableRipple
            label="New Product"
            {...a11yProps(1)}
            sx={style.productTabs}
          />
          <Tab
            disableRipple
            label="Special"
            {...a11yProps(2)}
            sx={style.productTabs}
          />
        </Tabs>
      </Box>

      <Box sx={style.panelTab}>
        <TabPanel
          value={value}
          index={0}
          style={{ marginBottom: "50px", padding: 0 }}
        >
          <Box>
            <Grid container sx={style.mainGridContainer}>
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
                      <CardActions sx={style.buttonContainer}>
                        <Button
                          variant="contained"
                          sx={style.cardButton1}
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
          </Box>
          <Pagination
            count={Math.ceil(userData.products.length / PER_PAGE)}
            page={page}
            onChange={handleChangePagination}
            color="primary"
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 3,
              "& .MuiPaginationItem-root": {
                color: "#479923",
              },
            }}
          />

          <Box sx={style.loadButtonContainer}>
            <Button variant="outlined" sx={style.loadMoreButton}>
              Load More
            </Button>
          </Box>
        </TabPanel>
      </Box>
      {/*End of Tabbed Products*/}

      {/*What we offer*/}
      <Box sx={style.suggestTitle}>
        <Typography variant="h1" sx={style.productHead}>
          {" "}
          What We Offer
        </Typography>
      </Box>

      <Box sx={style.whatWeOfferContainer}>
        <Grid container sx={style.gridOffer} spacing={3}>
          <Grid item>
            <Box sx={style.offerBoxItem}>
              <img
                alt="logo"
                src={easyorder}
                style={{
                  width: "50px",
                }}
              />
              <Typography sx={style.serviceTitle}>
                Fast {"&"} Easy Order
              </Typography>
              <Typography sx={style.serviceDescription}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae optio reprehenderit unde possimus sed!
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box sx={style.offerBoxItem}>
              <img
                alt="logo"
                src={fresh}
                style={{
                  width: "50px",
                }}
              />
              <Typography sx={style.serviceTitle}>
                Fresh {"&"} Quality Product
              </Typography>
              <Typography sx={style.serviceDescription}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae optio reprehenderit unde possimus sed!
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box sx={style.offerBoxItem}>
              <img
                alt="logo"
                src={affordable}
                style={{
                  width: "50px",
                }}
              />
              <Typography sx={style.serviceTitle}>
                Affordable Products
              </Typography>
              <Typography sx={style.serviceDescription}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae optio reprehenderit unde possimus sed!
              </Typography>
            </Box>
          </Grid>

          <Grid item>
            <Box sx={style.offerBoxItem}>
              <img
                alt="logo"
                src={deliver}
                style={{
                  width: "50px",
                }}
              />
              <Typography sx={style.serviceTitle}>Fast Delivery</Typography>
              <Typography sx={style.serviceDescription}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestiae optio reprehenderit unde possimus sed!
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/*End of What we offer*/}

      {/*Testimonials*/}
      <Box sx={style.suggestTitle}>
        <Typography variant="h1" sx={style.productHead}>
          {" "}
          Testimonials
        </Typography>
      </Box>

      <Box sx={style.testimonialContainer}>
        <Box sx={{ width: "80%", margin: "auto" }}>
          <Slider {...settings}>
            <Box sx={style.commentInfo}>
              <Avatar alt="commentor" src={aissa} sx={style.commentorAvatar} />
              <Typography sx={style.commentorName}>Luissa De Jesus</Typography>
              <Box sx={style.commentStarContainer}>
                <Rating
                  readOnly
                  value={4}
                  sx={style.commentStars}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Box>
              <Typography sx={style.commentContent}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Labore, nobis accusantium sapiente minima quam ipsam tempore
                dolorem suscipit iusto animi non amet ea eum dolores eaque,
                eligendi at in cupiditate?
              </Typography>
            </Box>

            <Box sx={style.commentInfo}>
              <Avatar alt="commentor" src={aissa} sx={style.commentorAvatar} />
              <Typography sx={style.commentorName}>Luissa De Jesus</Typography>
              <Box sx={style.commentStarContainer}>
                <Rating
                  readOnly
                  value={4}
                  sx={style.commentStars}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Box>
              <Typography sx={style.commentContent}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Labore, nobis accusantium sapiente minima quam ipsam tempore
                dolorem suscipit iusto animi non amet ea eum dolores eaque,
                eligendi at in cupiditate?
              </Typography>
            </Box>

            <Box sx={style.commentInfo}>
              <Avatar alt="commentor" src={aissa} sx={style.commentorAvatar} />
              <Typography sx={style.commentorName}>Luissa De Jesus</Typography>
              <Box sx={style.commentStarContainer}>
                <Rating
                  readOnly
                  value={4}
                  sx={style.commentStars}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />
              </Box>
              <Typography sx={style.commentContent}>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Labore, nobis accusantium sapiente minima quam ipsam tempore
                dolorem suscipit iusto animi non amet ea eum dolores eaque,
                eligendi at in cupiditate?
              </Typography>
            </Box>
          </Slider>
        </Box>
      </Box>
      {/*End of Testimonials*/}

      {/**/}

      {/**/}
      <Footer />
    </Box>
  );
};

export default HomeNoUser;
