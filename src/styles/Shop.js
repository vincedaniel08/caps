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

    selectContainer: {
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid #cdcdcd',
        width: '100%',
        alignItems: 'center',
        padding: '10px',
    },

    searchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },

    searchBar: {
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#cdcdcd',
            },
            '&:hover fieldset': {
                borderColor: '#cdcdcd',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#479923',
            },

            fontFamily: 'Poppins',
            fontSize: '15px',
        },

        '& .MuiInputBase-input': {
            padding: '6px',
            color: '#000',
        },

        margin: '0px 10px 0px 10px',
        width: '100%',
    },

    formControl: {
        margin: 1,
    },

    searchProduct: {
        borderRadius: 0,
        boxShadow: 0,
    },

    sortText: {
        fontFamily: 'Semibold',
    },

    selectSort: {
        height: '35px',
        border: '1px solid #cdcdcd',
        color: '#cdcdcd',
        width: '150px',
        display: 'flex',
    },

    gridContainerCard: {
        justifyContent: {
            xs: 'center',
            sm: 'center',
            md: 'flex-start',
            lg: 'flex-start',
        },
        width: '100%',
    },


    optionGrid: {
        alignItems: 'center',
        padding: '20px',
    },

    boxCategory: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    allCategoryTitle: {
        fontFamily: 'Semibold',
        margin: '15px 0 20px 0',
        color: '#fff',
        backgroundColor: '#479923',
        padding: '10px',
    },

    allCategoryItems: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        lineHeight: '25px',
        color: '#8d8d8d',
        marginBottom: '5px',
        padding: '5px',
        transition: 'all ease 0.5s',

        "&:hover": {
            color: '#fff',
            backgroundColor: '#479923',
        },
    },

    grid1: {
        padding: '10px',
        display: 'flex',
    },

    cardItem2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px',

        "& div.MuiGrid-root.MuiGrid-item": {

        },
    },

    cardWrapper: {
        width: {
            xs: '175px',
            sm: '175px',
            md: '190px',
            lg: '220px',
            xl: '220px',
        },
        marginBottom: '5px',
        "&:hover": {
            boxShadow: '0px 0px 0px 2px #ffa200 inset',
            transition: 'all ease 1s',
        },
    },

    cardHeader: {
        padding: '8px 0px 5px 10px',
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

    productTitle: {
        fontFamily: 'Bold',
        fontSize: '20px',
        marginBottom: '10px',
        marginLeft: '10px',
        marginTop: '5px',
    },

    retailTag: {
        fontFamily: 'Poppins',
        fontSize: '13px',
        backgroundColor: '#479923',
        width: '50px',
        textAlign: 'center',
        borderRadius: '2px',
    },

    cardDescription: {
        fontFamily: 'Poppins',
        fontSize: '12px',
        color: '#cccccc',
        marginBottom: '-10px',
    },

    cardButton1: {
        width: '100%',
        fontFamily: 'Poppins',
        fontSize: '13px',
        marginTop: '-20px',
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


    priceRange: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '10px',
    },

    min: {
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

    },

    max: {
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
    },

    searchPriceButton: {
        boxShadow: 0,
        borderRadius: 0,
        width: '50px',
    },


    checkBoxChoices: {
        color: '#8c8c8c',   
    },

    checkBoxLabel: {
        color: '#8c8c8c',
        marginBottom: '-5px',
        '& .MuiFormControlLabel-label': {
            fontFamily: 'Poppins',
            fontSize: '15px',
        },
    },

    productWrapper: {
        display: 'flex',
        flexDirection: 'column',
    },

    suggestCardWrapper: {
        display: 'flex',
        flexDirection: 'row',
    },

    cardProductItem: {
        marginBottom: '5px',
    },

    cardMediaWidth: {
        width: 90,
    },

    suggestedStoreName: {
        fontFamily: 'Poppins',
        fontSize: '13px',
        color: '#8c8c8c',
    },

    suggestedProductName: {
        fontFamily: 'Poppins',
        fontSize: '15px',
        color: '#fff',
    },

    suggestedProductPrice: {
        fontFamily: 'Poppins',
        fontSize: '13px',
        color: '#8c8c8c',
    },

    loadButtonContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '20px',
        marginBottom: '30px',
    },

    loadMoreButton: {
        width: '200px',
        fontFamily: 'Poppins',

        "&: hover": {
            backgroundColor: '#479923',
            color: '#fff',
        },
    },

}

export default style;