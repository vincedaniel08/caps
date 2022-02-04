const style = {
    coverPhoto: {
        width: '100%',
        marginBottom: '-5px',
    },

    sellerProfileContainer: {
        padding: '30px',
        margin: 'auto',
        backgroundColor: '#292929',
    },

    gridStoreContainer: {
        flexDirection: {
            xs: 'column',
            md: 'row',
        },
    },

    gridItemStore1: {
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
    },

    gridItemStore2: {
        alignItems: {
            xs: 'center',
            md: 'normal',
        },
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    storePicture: {
        width: '150px',
        height: '150px',
        marginTop: {
            xs: '-100px',
            md: '0px',
        },
    },

    storeName: {
        fontFamily: 'bold',
        fontSize: '25px',
        color: '#fff',
    },

    icon: {
        color: '#008015',
    },

    productRating: {
        fontSize: '20px',
    },

    storeAddress: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '5px',
    },

    storeAddressText: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        marginLeft: '10px',
        color: '#f5f5f5',
    },

    chatButton: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        marginRight: '10px',
    },

    followButton: {
        boxShadow: 0,
        borderRadius: 0,
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
        marginRight: '10px',
        backgroundColor: '#e06c00',
    },

    chatContainer: {
        justifyContent: 'flex-end',
        flexDirection: 'column',
        display: 'flex',
    },

    buttonHolder: {
        justifyContent: 'flex-end',
        display: 'flex',
    },

    leftContainerGrid: {
        backgroundColor: '#ededed',
    },

    leftContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
    },

    searchText: {
        fontFamily: 'Semibold',
        fontSize: '15px',
        marginBottom: '25px',
        color: '#479923',
    },

    searchProduct: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#479923',
            },
            '&:hover fieldset': {
                borderColor: '#479923',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },

            fontFamily: 'Poppins',
            fontSize: '15px',
        },

        '& .MuiInputBase-input': {
            padding: '6px',
            color: '#000',
        },

        marginRight: '10px',
        marginBottom: '25px',
    },

    productAllCategories: {
        fontFamily: 'Semibold',
        marginBottom: '15px',
        color: '#479923',
    },

    productCategory: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        lineHeight: '35px',
        color: '#8c8c8c',
        transition: 'all ease 0.5s',
        paddingLeft: '10px',

        "&:hover": {
            color: '#fff',
            backgroundColor: '#479923',
        },
    },

    storeContentContainer: {
        padding: '30px',
    },

    productTabs: {
        color: '#9E9E9E',
        fontFamily: 'Semibold',
        textTransform: 'capitalize',
        borderBottom: '1px solid #cdcdcd',
    },

    tabMain: {
        borderRight: 1,
        borderColor: 'divider',


        '& .Mui-selected': {
            color: '#479923',
            backgroundColor: '#f5f5f5',
            borderTop: '1px solid #cdcdcd',
            borderLeft: '1px solid #cdcdcd',
            borderRight: '1px solid #cdcdcd',
            borderBottom: 0,
        },
    },

    cardItem2: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    storeProductContainer: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'center',
            lg: 'flex-start',
        },

        '& .MuiGrid-item': {
            margin: 0,
            padding: 0,
            width: '280px',
        },
    },

    cardWrapper: {
        width: '85%',
        marginBottom: '15px',
        "&:hover": {
            boxShadow: '0px 0px 0px 2px #ffa200 inset',
            transition: 'all ease 1s',
        },
    },

    cardTitle: {
        fontFamily: 'Poppins',
        fontSize: '15px',
    },

    cardStars: {
        fontSize: '16px',
    },

    cardPrice: {
        fontFamily: 'Poppins',
        color: '#8c8c8c',
        fontSize: '13px',
    },

    cardDescription: {
        fontSize: '12px',
        color: '#cccccc',
        marginBottom: '-10px',
    },

    cardButton1: {
        
        fontFamily: 'Poppins',
        fontSize: '13px',

        "&:hover": {
            backgroundColor: '#ffa200',
            transition: 'all ease 0.5s',
        },
    },

    cardButton2: {
        width: '30%',
        fontFamily: 'Poppins',
        fontSize: '13px',

        "&:hover": {
            backgroundColor: '#ffa200',
            transition: 'all ease 0.5s',
        },
    },

    whiteContainer1: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: '10px 20px 10px 20px',
    },

    textTitle1: {
        fontFamily: 'Semibold',
        fontSize: '15px',
        color: '#479923',
    },

    textContent1: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        color: '#8c8c8c',
        textAlign: 'justify',
        marginTop: '15px',
    },

    whiteContainer2: {
        backgroundColor: '#fff',
        padding: '10px 20px 10px 20px',
    },

    formBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '5px',
    },

    textTitle2: {
        fontFamily: 'Semibold',
        fontSize: '15px',
        color: '#479923',
        marginBottom: '10px',
    },

    textContent2: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        color: '#8c8c8c',
        display: 'inline-block',
    },



}
export default style;