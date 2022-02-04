import agri from '../image/agri.png';

const style = {
    root: {
        "& .MuiPaper-root": {
            backgroundColor: '#333'
        },
    },

    appbar: {
        position: 'fixed',
        backgroundColor: {
            xs: '#fff',
            sm: '#fff',
            md: 'transparent',
            lg: 'transparent',
            xl: 'transparent',
        },
        fontFamily: 'Poppins',
        height: '80px',
        justifyContent: 'center',
        boxShadow: 'none',
    },

    appbarScroll: {
        backgroundColor: '#fff',
        fontFamily: 'Poppins',
        height: '80px',
        justifyContent: 'center',
    },


    boxLogo: {
        backgroundImage: `url(${agri})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
        width: '125px',
        height: '25px',
       
    },

    menuIconContainer: {
        color: '#8c8c8c',
        display: {
            xs: 'flex',
            sm: 'none',
            md: 'none'
        },
    },

    navlink: {
        color: {
            xs: '#8c8c8c',
            sm: '#8c8c8c',
            md: '#fff',
            lg: '#fff',
            xl: '#fff',
        },
        fontFamily: 'Poppins',
        letterSpacing: '1px',
        fontSize: '15px',
        margin: 2,
        display: {
            xs: 'none',
            sm: 'flex',
            md: 'block',
        },
        "&:hover": {
            color: '#479923',
            transition: 'ease-out 0.5s',
        },
        transition: 'ease-out 0.5s',
    },

    navlinkScroll: {
        color: {
            xs: '#8c8c8c',
            sm: '#8c8c8c',
            md: '#8c8c8c',
            lg: '#8c8c8c',
            xl: '#8c8c8c',
        },
        fontFamily: 'Poppins',
        letterSpacing: '1px',
        fontSize: '15px',
        margin: 2,
        display: {
            xs: 'none',
            sm: 'flex',
            md: 'block',
        },
        "&:hover": {
            color: '#479923',
            transition: 'ease-out 0.5s',
        },
    },

    iconContainer: {
        margin: '3px',
        color: {
            xs: '#8c8c8c',
            sm: '#8c8c8c',
            md: '#8c8c8c',
            lg: '#fff',
            xl: '#fff',
        },
    },

    iconContainerScroll: {
        color: '#8c8c8c',
        margin: '3px',
    },

    icon: {
        width: '20px',
        height: '20px',
    },

    listbox: {
        padding: 3,
        width: 250,
    },

    closeDrawer: {
        paddingLeft: 2,
        display: 'flex',
        alignItems: 'center',
    },

    titleDrawer: {
        fontFamily: 'Poppins',
        color: '#fff',
    },

    closeDrawerIcon: {
        color: '#fff',
        width: '20px',
        height: '20px',
        "&:hover": {
            color: '#479923',
            transition: 'ease-out 0.5s',
        },
    },

    linkDrawer: {
        color: '#9F9F9F',
        fontSize: '15px',
        lineHeight: '15px',
        fontFamily: 'Poppins',

        "&:hover": {
            color: '#479923',
            transition: 'ease-out 0.5s',
        },
    },
    linkDrawerLang: {
        //color: '#9F9F9F',
        fontSize: '15px',
        lineHeight: '15px',
        fontFamily: 'Poppins',

        "&:hover": {
            color: '#479923',
            transition: 'ease-out 0.5s',
        },
    },

    copyright: {
        fontFamily: 'Poppins',
        fontSize: '12px',
        margin: 'auto',
        paddingTop: '20px',
        color: '#9F9F9F',
    },

};

export default style;