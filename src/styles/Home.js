import offer1 from '../assets/images/offer1.jpg';
import offer2 from '../assets/images/offer2.jpg';
import offer3 from '../assets/images/offer3.jpg';


const style = {
    bannerSliderContainer: {
        width: '100%',
        marginTop: {
            xs: '80px',
            sm: '80px',
            md: '80px',
            lg: '0px',
        },
    },

    offerContainer: {
        padding: '10px',
        marginBottom: '60px',
    },

    designImg1: {
        position: 'relative',
        overflow: 'hidden',

        "span:first-of-type": {
            position: 'absolute',
            zIndex: 1,
            width: 'auto',
            padding: '20px',
            alignItems: 'center',
            bottom: '20px',
        },
    },

    offer1: {
        height: '400px',
        width: '100%',
        backgroundImage: `url(${offer1})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: 'all ease .5s',

        "&:hover": {
            transform: 'scale(1.2)',
        },
    },

    designImg2: {
        position: 'relative',
        overflow: 'hidden',

        "span:first-of-type": {
            position: 'absolute',
            zIndex: 1,
            padding: '20px',
            alignItems: 'center',
            bottom: '20px',
        },
    },

    offer2: {
        height: '196px',
        backgroundImage: `url(${offer2})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: 'all ease .5s',

        "&:hover": {
            transform: 'scale(1.2)',
        },
    },

    designImg3: {
        position: 'relative',
        overflow: 'hidden',
        marginTop: '8px',
        "span:first-of-type": {
            position: 'absolute',
            zIndex: 1,
            padding: '20px',
            alignItems: 'center',
            bottom: '20px',
        },
    },

    offer3: {
        height: '196px',
        backgroundImage: `url(${offer3})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        transition: 'all ease .5s',

        "&:hover": {
            transform: 'scale(1.2)',
        },
    },

    offerText1: {
        fontFamily: 'Poppins',
        fontSize: '25px',
        fontWeight: 600,
        color: '#fff',
    },

    offerText2: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        color: '#479923',
    },

    tagLine1: {
        fontFamily: 'Poppins',
        fontSize: {
            xs: '15px',
            sm: '15px',
            md: '20px',
            lg: '20px',
        },

        marginTop: {
            xs: '10px',
            sm: '10px',
            md: '0px',
            lg: '0px'
        },

        color: '#fff',
        textAlign: 'center',

    },

    tagLine2: {
        fontFamily: 'Bold',
        fontSize: {
            xs: '60px',
            sm: '80px',
            md: '100px',
            lg: '120px'
        },
        color: '#479923',
        letterSpacing: '-5px',
        marginBottom: '-30px',
        textAlign: 'center',
    },

    suggestTitle: {
        width: '100%',
        textAlign: 'center',
        position: 'relative',
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

    slideMainContainer: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        alignContent: 'center',
        margin: 'auto',
        marginBottom: '50px',
    },

    sliderContainer: {
        width: {
            xs: '90%',
            sm: '90%',
            md: '90%',
            lg: '100%',
            xl: '100%',
        },
    },

    sliderBox: {
        display: 'block'
    },

    tabContainer: {
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',

        "& .MuiTab-root": {
            minHeight: '5px',
            padding: '0px 5px 0px 5px',
        },
    },

    tabMain: {
        '& .Mui-selected': {
            color: '#479923',
        },
    },

    productTabs: {
        color: '#9E9E9E',
        fontFamily: 'Poppins',
        textTransform: 'capitalize',
    },

    mainGridContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    panelTab: {
        display: 'flex',
        justifyContent: 'center',

        "& .MuiBox-root":{
            padding: '0px',
        },
    },

    

    gridCard: {
        padding: '5px',
    },

    loadButtonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
    },

    loadMoreButton: {
        width: '200px',
        fontFamily: 'Poppins',

        "&: hover": {
            backgroundColor: '#479923',
            color: '#fff',
        },
    },

    whatWeOfferContainer: {
        width: '100%',
        marginBottom: '50px',
    },

    gridOffer: {
        justifyContent: 'center',
    },

    offerBoxItem: {
        width: '250px',
        height: '200px',
        textAlign: 'center',
        padding: '10px',
        border: '1px solid #479923',
        borderRadius: '8px',
        "&: hover": {
            border: '1px solid #4eff00',
        },
    },

    offerIcon: {
        fontSize: '40px',
        color: '#479923',
    },

    serviceTitle: {
        fontFamily: 'Semibold',
        fontSize: '17px',
        marginBottom: '10px',
        color: '#479923',
    },

    serviceDescription: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        color: '#4f4f4f',
    },

    

    testimonialContainer: {
        backgroundImage: `url(${offer3})`,
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        width: '100%',
        height: '45vh',
        marginBottom: '50px',
    },

    commentInfo: {
        display: 'flex',
        flexDirection: 'column',
    },

    commentorAvatar: {
        width: '100px',
        height: '100px',
        margin: 'auto',
        marginTop: '50px',
    },

    commentorName: {
        fontFamily: 'Semibold',
        fontSize: '20px',
        color: '#479923',
        textAlign: 'center',
    },

    commentContent: {
        fontFamily: 'Poppins',
        color: '#cdcdcd',
        textAlign: 'center',
    },

    commentStarContainer: {
        display: 'flex',
        justifyContent: 'center',
        margin: '5px 0px 5px 0px',
    },
    commentStars: {
        fontSize: '20px',
    },


}
export default style;