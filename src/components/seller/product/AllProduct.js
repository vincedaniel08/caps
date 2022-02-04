import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import {
  InputBase,
  Grid,
 // Paper,
  Card,
  Typography,
  IconButton,
 CardMedia,
  //CardHeader,
  CardContent,
  CardActions,
 // Avatar,
  Button,
  Menu,
  MenuItem,
//  Divider,


} from '@mui/material';

import { useSelector } from "react-redux";
//import { getProduct } from "../../redux/actions/userAction";
import { ref, deleteObject } from "@firebase/storage";
import { db, storage, auth } from "../../../utils/firebase";
import {  doc, deleteDoc,  } from '@firebase/firestore';
//import FavoriteIcon from '@mui/icons-material/Favorite';
//import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
//import Rating from '@mui/material/Rating';
//import StarIcon from '@mui/icons-material/Star';

import EditProduct from '../../modals/editProduct';
import QueryDeleteProduct from '../../modals/queryDeleteProduct';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('lg')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '90ch',
    },
  },
}));

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(2),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));


export default function AllProduct() {

 // const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  //const value = 3.5;
  const [products, setProducts] = React.useState([{ ProductName: "Loading...", id: "initial" }]);
  //const prodcutsCollectionRef = collection(db,"Products");
  const [editProductOpen, setEditProductOpen] = useState(false);
  const [queryDeleteProductOpen, setQueryDeleteProductOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [searchProduct, setSearchProduct] = useState("");

  useEffect(() => {
    console.log(searchProduct);
    // dispatch(getProduct(searchProduct))
    if (searchProduct === "") {
      // const collectionRef = collection(db, "Products");
      // const q = query(collectionRef, orderBy("CreatedDate"));

      // const unsub = onSnapshot(q, (snapshot) =>
      //   setProducts(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      // );

      setProducts(userData.products.filter((product) => product.SellerUid === userData.myuserdata.map((user) => user.UserUid)[0]))

      //return unsub;

    } else {
      setProducts(userData.products.filter((product) => ( 
        product.ProductName.toLowerCase().includes(searchProduct.toLowerCase()) 
      )) );
    
      };

      


    


  }, [searchProduct,userData]);
  //menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteProduct = async (product) => {

    console.log(product.id)
    //const uploadTask = uploadBytesResumable(storageRef, product.ProductImg, types);
    auth.onAuthStateChanged((user) => {
      if (user.uid === product.SellerUid) {
        const storageRef = ref(storage, `product-images/${product.ProductPicName}`);
        console.log(storageRef)
        const docRef = doc(db, "Products", product.id);

        deleteDoc(docRef);
        deleteObject(storageRef);
        alert("Successfully deleted your product")

        handleClose();
      }
      else { alert("Something error please comeback later") }
    })
  }
  const handleSearch = (e) => {
    setSearchProduct(e.target.value);
  }

  return (
    <Box>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search Product"
          onChange={handleSearch}
          value={searchProduct}

        />
      </Search>
      <Button variant="contained" sx={{ mt: 2, ml: 2, backgroundColor: "#EE4B2B", mb: 5 }} onClick={() => { setQueryDeleteProductOpen(true); }} >Query Delete</Button>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
   

      >
        {products.map((product) => (

          <Grid item xs={4} sm={4} md={4} lg={4} key={product.id} >
           

              <Card sx={{ maxWidth: "100%", maxHeight: "100%" ,borderRadius:3}} >
               
              
                  
                
                <CardMedia
                sx={{height:200}}
                  component="img"
                  image={product.ProductImg}
                  alt={product.ProductName}
                ></CardMedia>
                <CardContent sx={{ display: "block" }}>
                  <Box>
                  <Typography variant="body1" color="text.primary" sx={{ fontWeight: 700 }} noWrap>
                      {product.ProductName}{" "}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 700,mt:1 }}>
                      {product.ProductSalePrice}{" "}Php
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick} sx={{marginLeft:'auto',mt:-65,color:"white",boxShadow:10}}>
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                  id="basic-menu"
                  MenuListProps={{
                    'aria-labelledby': 'fade-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}

                >
                  <MenuItem onClick={() => { setEditProductOpen(true); setProductId(product);setAnchorEl(false) }}>Edit</MenuItem>
                  <MenuItem  onClick={() => { deleteProduct(product) }}>Delete</MenuItem>

                </Menu>
                </CardActions>

              </Card>


          </Grid>
        ))}

      </Grid>
      <EditProduct open={editProductOpen} setOpen={setEditProductOpen} product={productId} />
      <QueryDeleteProduct open={queryDeleteProductOpen} setOpen={setQueryDeleteProductOpen} product={productId} />
    </Box>
  );
}