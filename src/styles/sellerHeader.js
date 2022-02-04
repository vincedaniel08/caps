const style = {
    appbar: {
      backgroundColor: "transparent",
      boxShadow: 0,
      aimation: "0.5",
      backdropFilter: "blur(3px)",
    },
    appbarScroll: {
      background: (theme) => theme.palette.background.default,
      boxShadow: 0,
      backdropFilter: "blur(3px)",
      aimation: "0.5",
    },
    appbarBox: {
      flexGrow: 1,
    },
    mainBox: {
      display: 'flex',
    },
    logoText: {
      textAlign: "center",
      display: {
        xs: 20,
      },
    },
    dateBox: {
      fontSize: 10,
      display: {
        xs: "none",
        md: "block",
        xl: "block",
      },
    },
    typography: {
      mt: 5,
      margin: 1,
      fontSize: {
        sx: 0,
        md: 12,
        xl: 15,
      },
    },
    listItemContainer: {
      borderRadius: 2,
      mx: 1,
      my: .5,
      height: 35,
      "&.Mui-selected": {
        borderLeft: `5px solid ${"primary "}`,
        borderRadius: 2,
        mx: 1,
        my: .5,
        height: 35
      }
    },
  
    listItemContainerUser: {
      borderRadius: 2,
      mx: 1,
      height: 60,
      mb: 5,
      "&.Mui-selected": {
        
        background: "background.paper", 
      }
    },
    listItemContainerLogo: {
      borderRadius: 2,
      height: 60,
      ml: -2
    },
  
  };

  export default style;
  