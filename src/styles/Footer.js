
const style = {

    footerMainBox: {
    },

    mainContainer: {
    
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
    },

    mainGrid: {
        justifyContent: 'center',
    },

    perContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '270px',
        textAlign: {
            xs: 'center',
            sm: 'center',
            md: 'center',
            lg: 'left',
        },
    },

    socmedLink: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'center',
            lg: 'flex-start',
        },
    },

    socmedContainer: {
        border: '0.01em solid #c9c9c9',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2px',
        transition: 'all ease 0.5s',
        color: '#9e9e9e',
        cursor: 'pointer',
        "&: hover": {
            backgroundColor: '#479923',
            border: '0.01em solid #479923',
            color: '#fff',
        },
    },

    socmed: {
        fontSize: '19px',
    },

    footerTitle: {
        fontFamily: 'Bold',
        fontSize: '23px',
        lineHeight: '55px',
    },

    footerContent: {
        fontFamily: 'Poppins',
        lineHeight: '30px',
        cursor: 'pointer',
        fontSize: '15px',

        "&:hover":{
            color: '#479923',
        },
    },

    footerContentText: {
        fontFamily: 'Poppins',
        lineHeight: '30px',
        fontSize: '15px',
    },

    horizontalRule: {
        border: '1px solid #000',
        width: '95%',
        margin: 'auto',
        backgroundColor: '#f5f5f5',
        opacity: '.2',
    },

    boxFooter: {
        backgroundColor: '#479923',
        width: '100%',
        height: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },

    boxMiniFooter: {
        fontFamily: 'Poppins',
        color: '#fff',
        fontSize: {
           xs: '9px',
           sm: '9px',
           md: '13px',
           lg: '14px',
        },
    },
}
export default style;