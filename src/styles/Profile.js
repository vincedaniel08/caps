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

    menuLinkContainer: {
        padding: '15px',
    },

    tabsStyle: {
        "& .MuiTab-root": {
            minHeight: '38px',
        },
    },

    profileTab: {
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        color: '#000',
        alignItems: 'center',
        justifyContent: 'flex-start',
        display: 'flex',
        flexDirection: 'row',

        "& .MuiTab-iconWrapper": {
            marginBottom: '0px',
        },
    },

    profileIcon: {
        fontSize: '25px',
        marginRight: '10px',
    },

    profilePicture: {
        width: '40px',
        height: '40px',
        marginRight: '10px',
    },

    profilePictureContainer: {
        display: 'flex',
        padding: '10px',
        alignItems: 'center',
    },

    profileName: {
        fontFamily: 'Semibold',
    },

    panelContainer: {
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '1px 4px 5px -3px rgba(0,0,0,0.38)',
        borderRadius: '3px',
    },

    titleContainer: {
        padding: '5px 0px 10px 20px',
    },

    profileTitle1: {
        fontFamily: 'Semibold',
        fontSize: '20px',
        marginLeft: '2px',
        marginTop: '10px',
    },

    profileInstructionText: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        marginLeft: '2px',
    },

    userName: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1.5px solid #479923',
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
            width: {
                xs: '100%',
                sm: '100%',
                lg: '200%',
            },
            height: '40px',
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

    datePicker: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1.5px solid #479923',
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
            width: {
                xs: '100%',
                sm: '100%',
                lg: '163%',
            },
            height: '40px',
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

    fieldMain: {
        width: '100%',
    },

    fieldContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        margin: '10px auto',
        padding: '5px',
    },

    optionTextContainer: {
        width: '100px',
        textAlign: 'right',
    },

    optionText: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        marginRight: '5px',
    },

    // buttonContainer: {
    //     display: 'flex',
    //     width: {
    //         xs: '85%',
    //         sm: '85%',
    //         md: '80%',
    //         lg: '80%',
    //     },
    //     justifyContent: 'flex-end',
    //     margin: 'auto',
    //     marginBottom: '20px',
    // },

    saveButton: {
        fontFamily: 'Poppins',
        boxShadow: 0,
        borderRadius: '0',
        textTransform: 'capitalize',
        width: '30%',
    },

    proPicContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        flexDirection: 'column',
    },

    proPic: {
        width: '120px',
        height: '120px',
    },

    uploadImage: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        margin: '10px 0px 10px 0px'
    },

    warningContainer: {
        padding: '10px',
    },

    warning1: {
        display: 'flex',
        padding: '10px',
        backgroundColor: '#ffa7a1',
        border: '1px solid #ff3224',
        borderRadius: '5px',
    },

    warning2: {
        display: 'flex',
        padding: '10px',
        backgroundColor: '#bfff96',
        border: '1px solid #399400',
        borderRadius: '5px',
    },

    warning1Text: {
        fontFamily: 'Poppins',
    },

    addressContainer: {
        padding: '10px'
    },

    address1: {
        display: 'flex',
        flexDirection: 'column',
    },

    addressText: {
        fontFamily: 'Poppins',
    },

    streetAddress: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                border: '1.5px solid #479923',
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
            width: '100%',
            height: '40px',
            borderRadius: 0,
            margin: '0px 3px 5px 3px',
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

    baranggayChoice: {
        border: '1.5px solid #479923',
        borderRadius: 0,
        height: '40px',
        margin: '0px 3px 5px 3px',
        width: '60%',
        fontFamily: 'Poppins',
        color: '#000',

        '& .MuiPopover-paper': {
            maxHeight: '10px',
        },
    },

    buttonSaveAddressContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end', marginTop: '10px',
    },

    buttonSaveAddress: {
        borderRadius: 0,
        boxShadow: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
    },

    nameAddressContainer: {
        display: 'flex',
        alignItems: 'center',
    },

    nameAddress: {
        fontFamily: 'Semibold',
        marginRight: '10px',
    },

    addressStatus: {
        fontFamily: 'Poppins',
        backgroundColor: '#479923',
        padding: '2px',
        color: '#fff',
        borderRadius: '5px',
        fontSize: '14px',
        width: '52px',
    },

    contactNumber: {
        fontFamily: 'Poppins',
    },

    mainAddress: {
        fontFamily: 'Poppins',
    },

    mainAddCon: {
        padding: '10px',
        width: '90%',
    },

    addDetails: {
        padding: '10px',
    },

    spare: {
        display: 'flex',
        border: '1px solid #cdcdcd',
        backgroundColor: '#e6e6e6',
    },

    buttonContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',
    },

    editAddressButton: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        backgroundColor: '#f5762c',
    },

    defaultAddressButton: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        marginTop: '10px',
    },

    newAddress: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
    },

    orderNotif: {
        padding: '10px',
        backgroundColor: '#ffdb9e',
        border: '1px solid #d1890d',
        borderRadius: '3px',
    },

    orderWarning: {
        fontFamily: 'Poppins',
    },

    orderMainContainer: {
        backgroundColor: '#e6e6e6',
        border: '1px solid #cdcdcd',
    },

    orderHeader: {
        display: 'flex',
        padding: '10px',
        alignItems: 'center',
    },

    chatButton: {
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        padding: '0px',
        maxHeight: '30px',
        borderRadius: 0,
        boxShadow: 0,
        marginRight: '5px',
        border: '1px solid #479923',
    },

    viewShopButton: {
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        padding: '0px',
        maxHeight: '30px',
        borderRadius: 0,
        boxShadow: 0,
        width: '100px',
        marginRight: '5px',
    },

    shopName: {
        fontFamily: 'Semibold',
        marginRight: '10px'
    },

    shopPicture: {
        marginRight: '10px',
    },

    orderInfoContainer: {
        padding: '10px',
        display: 'flex',
    },

    paymentType1: {
        width: '50px',
        backgroundColor: '#ff8229',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '3px',
        fontFamily: 'Semibold',
    },

    paymentType2: {
        width: '50px',
        backgroundColor: '#479923',
        color: '#fff',
        textAlign: 'center',
        borderRadius: '3px',
        fontFamily: 'Semibold',
    },

    productTitle: {
        fontFamily: 'Semibold',
    },

    productOrderID: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        color: '#6e6e6e',
    },

    orderQty: {
        fontFamily: 'Poppins',
        fontSize: '14px',
        color: '#6e6e6e',
    },

    orderPriceContainer: {
        padding: '10px',
        textAlign: {
            xs: 'left',
            sm: 'left',
            md: 'right',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    orderStatus: {
        fontFamily: 'Poppins',
    },

    orderPrice: {
        fontFamily: 'Poppins',
    },

    checkProductButton: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        ml:1,
        "&:disabled": {
            backgroundColor: "gray" || 'red'
          }
    },

    gridButtonContainer: {
        width: {
            xs: '100%',
            sm: '100%',
            md: '40%',
            lg: '50%',
        },
    },

    orderButtonContainer: {
        padding: '10px',
        display: 'flex',
        justifyContent: {
            xs: 'flex-start',
            sm: 'flex-start',
            md: 'flex-end',
        },
    },

    paymentContainer: {
        display: 'flex',
    },

    modalContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {
            xs: '100%',
            sm: '100%',
            md: '80%',
            lg: '70%',
        },
        backgroundColor: '#fff',
        boxShadow: 24,
        padding: '5px',
    },

    productTitleModal: {
        padding: '10px',
    },

    productOrderModal: {
        fontFamily: 'Poppins',
        color: '#fff',
    },

    orderStatusContainer: {
        display: 'flex',
        flexDirection: 'column',
    },

    orderStatusTitle: {
        fontFamily: 'Semibold',
        color: '#000',
        fontSize: '14px',
    },

    orderStatusDate: {
        fontFamily: 'Poppins',
        color: '#6e6e6e',
        fontSize: '14px',
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

}
export default style;