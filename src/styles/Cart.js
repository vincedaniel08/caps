import breadcrumbs from '../image/breadcrumbs.jpg';

const style = {
    breadCrumbsContainer: {
        height: '30vh',
        width: '100%',
        backgroundColor: 'black',
        backgroundImage: `url(${breadcrumbs})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
    },
    modalBox: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 350,
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
        minHeight: '20vh',
        marginTop: '20px',
    },

    cartContainer: {
        padding: '10px',
    },

    summaryContainer: {
        padding: '10px',
    },

    mainCart: {
        width: '90%',
        margin: 'auto',
    },

    cartBox: {
        backgroundColor: '#e3e3e3',
        display: 'flex',
        flexDirection: {
            xs: 'column',
            md: 'row',
        },

        justifyContent: 'space-between',

        borderBottom: '1px solid #cdcdcd',
    },

    productDetail: {
        width: {
            xs: '100%',
            md: '50%',
        },
        height: '150px',
        display: 'flex',
    },

    productDetail2: {
      p:2,
      width: "100%",
      height: '100px',
      display: 'flex',
      alignContent:"center",
      justifyContent:"center",
      flexDirection: "column"
  },

    productButtonContainer: {
        width: {
            xs: '100%',
            md: '20%',
        },
        height: {
            xs: '80px',
            md: '150px',
        },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 0,
        flexDirection: 'column',
    },

    imageBox: {
        width: '150px',
        height: '150px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },

    infoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    infoText: {
        fontFamily: 'Poppins',
      width:{
        xs:200,
        sm:210,
        md:250,
        lg:270,
        xl:350
      }
    },

    orderSummary: {
        backgroundColor: '#e3e3e3',
        width: '100%',
        borderRadius: '5px',
    },

    orderSummaryText: {
        textAlign: 'center',
        padding: '10px',
        fontFamily: 'Semibold',
        fontSize: '18px',
    },

    orderTextContainer: {
        display: 'flex',
        padding: '10px',
        justifyContent: 'space-between',
        margin: '0px 0px',
    },

    orderText1: {
        fontFamily: 'Semibold',
    },

    orderText2: {
        fontFamily: 'Poppins',
    },



    removeButton: {
        textTransform: 'capitalize',
        padding: 0,
        boxShadow: 0,
        borderRadius: 0,
        width: '20%',
        marginTop: '5px',
        fontFamily: 'Poppins',
        backgroundColor: '#a10b00',
    },

    buttonCheckout: {
        textTransform: 'capitalize',
        width: '80%',
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        margin: 'auto',
    },


    lessButton: {
        backgroundColor: '#a10b00',
        fontFamily: 'Poppins',
        borderRadius: 0,
        boxShadow: 0,
        minWidth: '30px',
    },

    addButton: {
        backgroundColor: '#479923',
        fontFamily: 'Poppins',
        borderRadius: 0,
        boxShadow: 0,
        minWidth: '30px',
    },

    qtyInput: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#cdcdcd',
            },
            '&:hover fieldset': {
                borderColor: '#cdcdcd',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
                color: '#cdcdcd',
            },

            fontFamily: 'Poppins',
            fontSize: '15px',
            padding: 0,
            width: '50px',
            height: '36px',
            borderRadius: 0,
            margin: '0px 3px 0px 3px',
        },

        '& .MuiInputBase-input': {
            color: '#000',
        },


        '& .MuiInputAdornment-root': {
            backgroundColor: '#479923',
            color: '#000',
            padding: '17px 14px',
            borderTopRightRadius: '3px',
            borderBottomRightRadius: '3px',
        },
    },

    quantityContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cartQuantity: {
        fontFamily: 'Poppins',
        marginBottom: '10px',
    },

    suggestTitle: {
        width: '100%',
        textAlign: 'center',
        position: 'relative',
        marginTop: '50px',
    },

    productHead: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        textTransform: 'uppercase',
        letterSpacing: '3px',
        position: 'relative',
        marginRight: 'auto',
        marginBottom: '4rem',

        '&:after': {
            content: '""',
            width: '150px',
            height: '5px',
            backgroundColor: '#479923',
            position: 'absolute',
            bottom: '-2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            borderRadius: '2px',
            marginBottom: '5px',
        },
    },

    shoppingButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },

    continueShoppingButton: {
        borderRadius: 0,
        boxShadow: 0,
        textTransform: 'capitalize',
        fontFamily: 'Poppins',
        width: {
            xs: '60%',
            md: '30%',
        },
    },

    mainGridContainer: {
        mb:10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    sliderBox: {
        display: 'block'
    },

    cardWrapper: {
        width: {
            xs: '160px',
            sm: '160px',
            md: '170px',
            lg: '220px',
            xl: '220px',
        },
        "&:hover": {
            boxShadow: '0px 0px 0px 2px #ffa200 inset',
            transition: 'all ease 1s',
        },

        margin: '5px',

    },

    cardHeader: {
        padding: '8px 10px 5px 10px',
        display: 'flex',
        alignItems: 'center',
    },

    storeName: {
        fontFamily: 'Poppins',
        fontSize: '13px',
    },

    soldCount: {
        fontFamily: 'Poppins',
        fontSize: '13px',
        color: '#cccccc',
    },

    cardItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    cardTitle: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        marginTop: '-10px',
    },

    cardStars: {
        fontSize: '16px',
    },

    cardPrice: {
        fontFamily: 'Poppins',
        color: '#8c8c8c',
        fontSize: '13px',
        marginBottom: '-15px',
    },

    retailTag: {
        fontFamily: 'Poppins',
        fontSize: '13px',
        backgroundColor: '#479923',
        width: '50px',
        textAlign: 'center',
        borderRadius: '2px',
    },

    wholesaleTag: {
        fontFamily: 'Poppins',
        fontSize: '13px',
        backgroundColor: '#c40000',
        width: '80px',
        textAlign: 'center',
        borderRadius: '2px',
    },

    buttonContainer: {
        flexDirection: {
            xs: 'column',
            sm: 'column',
            md: 'row',
        },
    },

    cardButton1: {
        width: {
            xs: '100%',
            sm: '100%',
            md: '100%',
            lg: '100%',
        },
        fontFamily: 'Poppins',
        fontSize: '13px',

        "&:hover": {
            backgroundColor: '#ffa200',
            transition: 'all ease 0.5s',
        },
    },



}
export default style;
