import breadcrumbs from "../image/breadcrumbs.jpg";

const style = {
  breadCrumbsContainer: {
    height: "30vh",
    width: "100%",
    backgroundColor: "black",
    backgroundImage: `url(${breadcrumbs})`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 320,
    bgcolor: "background.paper",
    border: "2px solid #50DC9A",
    boxShadow: 24,
    p: 3,
   // overflow: "hidden",
    display: "block",
  },
  labelSelect: {
    outlineWidth: 200,
  },
  mainContainer: {
    padding: "40px",
  },

  productTitle: {
    fontFamily: "Semibold",
    fontSize: "20px",
  },

  productRating: {
    fontSize: "20px",
  },

  productPrice: {
    fontFamily: "Poppins",
    fontSize: "16px",
  },

  boxDivider: {
    marginTop: "20px",
    marginBottom: "20px",
  },

  otherDetails: {
    display: "flex",
    marginTop: "5px",
  },

  shippingDetails: {
    display: "flex",
    marginTop: "15px",
    alignItems: "center",

    "& .MuiButton-root": {
      minWidth: "20px",
    },
  },

  productBrandStore: {
    fontFamily: "Semibold",
    fontSize: "16px",
    marginRight: "10px",
  },

  sellerName: {
    fontFamily: "Poppins",
  },

  productAvailable: {
    fontFamily: "Poppins",
    backgroundColor: "#479923",
    color: "#fff",
    borderRadius: "5px",
    padding: "0px 5px 0px 5px",
    fontSize: "15px",
    display: "none",
  },

  productNotAvailable: {
    fontFamily: "Poppins",
    backgroundColor: "#cf0e00",
    color: "#fff",
    borderRadius: "5px",
    padding: "0px 5px 0px 5px",
    fontSize: "15px",
  },

  productDescription: {
    fontFamily: "Poppins",
    fontSize: "15px",
    marginBottom: "10px",
  },

  mopedIcon: {
    fontSize: "25px",
    marginRight: "5px",
  },

  productShippingDetails: {
    display: "flex",
    alignItems: "center",
    fontFamily: "Poppins",
  },

  inputQuantity: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#cdcdcd",
      },
      "&:hover fieldset": {
        borderColor: "#cdcdcd",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
        color: "#cdcdcd",
      },

      fontFamily: "Poppins",
      fontSize: "15px",
      padding: 0,
      width: {
        xs: "70%",
        md: "120px",
        lg: "120px",
      },
      height: "35px",
    },

    "& .MuiInputBase-input": {
      color: "#000",
    },

    "& .MuiInputAdornment-root": {
      backgroundColor: "#479923",
      color: "#000",
      padding: "17px 14px",
      borderTopRightRadius: "3px",
      borderBottomRightRadius: "3px",
    },
  },

  decrementButton: {
    boxShadow: 0,
    borderRadius: 0,
    backgroundColor: "#cf0e00",
    marginLeft: {
      xs: "0px",
      md: "5px",
    },
  },

  incrementButton: {
    boxShadow: 0,
    borderRadius: 0,
    backgroundColor: "#479923",
    marginLeft: "5px",
  },

  buttonIcons: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row",
    },
    marginTop: "25px",
    justifyContent: "space-evenly",
  },

  addtocartButton: {
    borderRadius: 0,
    boxShadow: 0,
    width: {
      xs: "100%",
      md: "48%",
    },
    fontFamily: "Poppins",
  },

  buynowButton: {
    borderRadius: 0,
    boxShadow: 0,
    width: {
      xs: "100%",
      md: "48%",
    },
    backgroundColor: "#e06c00",
    fontFamily: "Poppins",
    marginTop: {
      xs: "10px",
      md: "0px",
    },
  },

  productReviewContainer: {
    marginTop: "30px",
    border: "1px solid #cdcdcd",
    padding: "10px",
  },

  tabMain: {
    borderRight: 1,
    borderColor: "divider",

    "& .Mui-selected": {
      color: "#479923",
      backgroundColor: "#f5f5f5",
      borderTop: "1px solid #cdcdcd",
      borderLeft: "1px solid #cdcdcd",
      borderRight: "1px solid #cdcdcd",
      borderBottom: 0,
    },
  },

  productTabs: {
    color: "#9E9E9E",
    fontFamily: "Semibold",
    textTransform: "capitalize",
    borderBottom: "1px solid #cdcdcd",
  },

  boxReviewContainer: {
    display: "flex",
  },

  reviewBox: {
    display: "flex",
  },

  nameComment: {
    fontFamily: "Semibold",
    lineHeight: "20px",
    marginLeft: "5px",
  },

  commentHead: {
    marginLeft: "10px",
  },

  mainComment: {
    fontFamily: "Poppins",
    fontSize: "15px",
  },

  commentContainer: {
    display: "flex",
    marginTop: "10px",
  },

  rateSorter: {
    border: "1px solid #cdcdcd",
    marginBottom: "10px",
    padding: "10px",
  },

  buttonSorter: {
    fontFamily: "Poppins",
    textTransform: "capitalize",
    marginRight: "10px",
    marginTop: "5px",
  },

  timeDate: {
    fontFamily: "Poppins",
    fontSize: "13px",
    color: "#949494",
    marginTop: "15px",
  },

  storeInfo: {
    display: "flex",
  },

  storeContainer: {
    border: "1px solid #cdcdcd",
    marginBottom: "10px",
    padding: "10px",
  },

  storePicture: {
    display: "flex",
    marginRight: "10px",
  },

  storeName: {
    fontFamily: "Semibold",
  },

  storeAddress: {
    fontFamily: "Poppins",
    fontSize: "15px",
    fontStyle: "italic",
    lineHeight: "15px",
    marginBottom: "10px",
    color: "#949494",
  },

  storeAvatar: {
    width: {
      xs: "50px",
      md: "60px",
      lg: "70px",
    },

    height: {
      xs: "50px",
      md: "60px",
      lg: "70px",
    },
  },

  chatStoreButton: {
    fontFamily: "Poppins",
    textTransform: "capitalize",
    marginRight: "10px",
    borderRadius: 0,
  },

  viewStoreButton: {
    fontFamily: "Poppins",
    textTransform: "capitalize",
    marginRight: "10px",
    borderRadius: 0,
    boxShadow: 0,

    marginTop: {
      xs: "5px",
      sm: "0px",
      md: "0px",
    },
  },

  storeDetails: {
    display: "flex",
    marginTop: "10px",
    alignItems: "center",
  },

  storeRatingText: {
    fontFamily: "Poppins",
    fontSize: "15px",
    marginRight: "10px",
  },

  suggestTitle: {
    width: "100%",
    textAlign: "center",
    position: "relative",
  },

  productHead: {
    fontFamily: "Poppins",
    fontSize: "15px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    position: "relative",
    marginRight: "auto",
    marginBottom: "5rem",

    "&:after": {
      content: '""',
      width: "150px",
      height: "5px",
      backgroundColor: "#479923",
      position: "absolute",
      bottom: "-2rem",
      left: "50%",
      transform: "translateX(-50%)",
      borderRadius: "2px",
      marginBottom: "10px",
    },
  },

  productSliderContainer: {
    justifyContent: "center",
  },

  cardItem2: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  cardWrapper: {
    width: "95%",
    marginBottom: "15px",
    "&:hover": {
      boxShadow: "0px 0px 0px 2px #ffa200 inset",
      transition: "all ease 1s",
    },
  },

  cardHeader: {
    padding: "8px 0px 5px 10px",
    display: "flex",
    alignItems: "center",
  },

  storeNameCard: {
    fontFamily: "Poppins",
    fontSize: "13px",
  },

  soldCount: {
    fontFamily: "Poppins",
    fontSize: "13px",
    color: "#cccccc",
  },

  cardTitle: {
    fontFamily: "Poppins",
    fontSize: "15px",
  },

  cardStars: {
    fontSize: "16px",
  },

  cardPrice: {
    fontFamily: "Poppins",
    color: "#8c8c8c",
    fontSize: "13px",
  },

  cardDescription: {
    fontSize: "12px",
    color: "#cccccc",
    marginBottom: "-10px",
  },

  cardButton1: {
    width: "70%",
    fontFamily: "Poppins",
    fontSize: "13px",

    "&:hover": {
      backgroundColor: "#ffa200",
      transition: "all ease 0.5s",
    },
  },

  cardButton2: {
    width: "30%",
    fontFamily: "Poppins",
    fontSize: "13px",

    "&:hover": {
      backgroundColor: "#ffa200",
      transition: "all ease 0.5s",
    },
  },
};

export default style;
