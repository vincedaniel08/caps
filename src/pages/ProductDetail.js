import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NavbarmainNoUser from "../components/NavbarMainNoUser";
import Navbarmain from "../components/NavbarMain";
import Footer from "../components/Footer";
import style from "../styles/ProductDetails";

import {
  Box,
  Button,
  Typography,
  Rating,
  Grid,
  TextField,
  Divider,
  InputAdornment,
  Tabs,
  Tab,
  Avatar,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Breadcrumbs,
  Link,
} from "@mui/material";

import StarIcon from "@mui/icons-material/Star";
//import product from '../image/product.jpg';
import MopedIcon from "@mui/icons-material/Moped";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import bryce from "../image/bryce.jpg";
import chickenMeat from "../image/chickenMeat.jpg";
import chickenMeatHover from "../image/chickenMeatHover.jpg";
import ForumIcon from "@mui/icons-material/Forum";
import StorefrontIcon from "@mui/icons-material/Storefront";
//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//backend
import { useHistory } from "react-router-dom";
import { doc, getDoc,setDoc,collection,Timestamp,serverTimestamp } from "firebase/firestore";
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, auth ,storage} from "../utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";

const Productdetail = () => {
  // const dispatch = useDispatch();
 const userData = useSelector((state) => state.user);
 const [userName, setUserName] = React.useState("");
  const [barangay, setBarangay] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState(0);
  const [houseNumber, setHouseNumber] = React.useState(0);
  const [munipality, setMunicipality] = React.useState("Candaba");
  const [province, setProvince] = React.useState("Pampanga");
  const date = new Date();
  const history = useHistory();
  const [userImg, setUserImg] = useState(null);
  const [ ,setError] = useState('');
 const [modalNewAccount,setModalNewAccount] = useState(false);

 const CHARACTER_LIMIT = 50;
 const PHONE_LIMIT = 11;
 const HOUSE_LIMIT = 5;
 const types = ['image/png', 'image/jpeg']; // image types

 const productImgHandler = (e) => {
  let selectedFile = e.target.files[0];
  if (selectedFile && types.includes(selectedFile.type)) {
    setUserImg(selectedFile);
    setError('')
  }
  else {
    setUserImg(null);
    setError('Please select a valid image type (jpg or png)');
  }
}

  const [userAuth, setUserAuth] = useState([
    {
      uid: "initial",
    },
  ]);

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };
  let queryy = useQuery();
  let product = queryy.get("product");
  const [products, setProducts] = useState([
    { ProductImg: "Loading...", id: "initial" },
  ]);
  const [shops, setShops] = useState([
    { ShopName: "Loading...", id: "initial" },
  ]);

  //handle Change
  const [textfieldValue, settextfieldValue] = React.useState(1);
  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeBarangay = (event) => {
    setBarangay(event.target.value);

  }
  const handleChangeMunicipality = (event) => {
    setMunicipality(event.target.value);

  }
  const handleChangeProvince = (event) => {
    setProvince(event.target.value);

  }
  const handleChangePhone = (event) => {
    const re = /^[0-9\b]+$/;
    
    if (event.target.value === '' || re.test(event.target.value)) {
   
    setPhoneNumber(event.target.value);
    }
  }
  const handleChangeHouse = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
    setHouseNumber(event.target.value);
    }
  }

  //Button
  const buttonChat = (id) => {
    if (userAuth === null) {
      //toast.error("You need to login first");
      window.scrollTo(0, 0);

      history.push("/login");
    } else if (userAuth.uid === id) {
      toast.error("You cant chat yourself");
    } else {
     // console.log("add to cart", product);

     toast.success("Successfully add to your chat")
     auth.onAuthStateChanged((user) => {
      if(userData.chatUser.find((chat) =>(
        chat.UserUid === userAuth.uid &&  chat.SellerUid === id && chat.UserUid === userAuth.uid &&  chat.SellerUid === id 
      ))){
        //alert("already on chat")
        window.scrollTo(0, 0);
     history.push("/chat")


      }else{
        const newUserChat = doc(collection(db, "UserChat"));
        const data = {
          UserUid: userAuth.uid,
          SellerUid: id,
          uid: userAuth.uid, 
          name: userAuth.email,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: false,
        };
        setDoc(newUserChat, data);
 
        const newUserChat1 = doc(collection(db, "UserChat"));
        const data1 = {
         UserUid: userAuth.uid,
          SellerUid: id,
          uid: id, 
          name: userData.users.find((user) => (
            user.id === id
          )).ShopName,
          createdAt: Timestamp.fromDate(new Date()),
          isOnline: false,
        };
        setDoc(newUserChat1, data1);

        history.push("/chat")
      }


     });
     
   
   }
  };
  

  
  const buttonViewShop = (id) => {
    window.scrollTo(0, 0);
    history.push(`/shoppage?shop=${id}`);
  };
  const buttonAddToCart = (id) => {
    if (userAuth === null) {
      //toast.error("You need to login first");
      window.scrollTo(0, 0);

      history.push("/login");
    } else if (userAuth.uid === id) {
      toast.error("You cant add to cart your product");
    } else {
     // console.log("add to cart", product);

      if(userData.cart.find((item) => item.ProductId === product) ) {
        toast.error("This product is already on your cart.");
        return null;
      }else{ 
        
        toast.success("Successfully add to your cart")
      auth.onAuthStateChanged((user) => {
        const newCityRef = doc(collection(db, "Cart"));
        const data = {
          ProductId: product,
          CartQty: Number(1),
          BuyerUid: user.uid,
          SellerUid: id,
          CreatedDate: serverTimestamp(),
        };

        setDoc(newCityRef, data);
      });
      
     }
   }
  };

  const buttonBuy = (id) => {
    if (userAuth === null) {
      toast.error("You need to login first");
      history.push("/login")
    }else if (userAuth.uid === id){
      toast.error("You cant buy your product");
    } else {

      onAuthStateChanged(auth, async (user) => {
        if(user){
  
        const docRef = doc(db, "Users", user.uid);
        const docSnap =  await getDoc(docRef);
          if (docSnap.exists()) {
          setModalNewAccount(false);
         console.log("data exist") 
        }else{ 
          setModalNewAccount(true);
          console.log("not exist") 
          console.log(user.email) 
        }
      }
  
      });
    }
  };

  const buttonModalBack = () => {
    setModalNewAccount(false);
  };
  const buttonModalSave = () => {
    const ph = "Philippines";

    if((userName === "" || houseNumber === 0)||(barangay === "" || userImg === null) || phoneNumber=== 0){

      toast.error("All Field Required")
    }

    else{
    onAuthStateChanged(auth, (user) => {
    const storageRef = ref(storage,`users-images/${date.toLocaleTimeString() + userImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef,  userImg, types);
  
     // const uploadTask = ref(storage, `product-images/${productImg.name}`).put(productImg);
      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }, err => setError(err.message)
        , () => {
          
        
        //  const UserDocRef = doc(collection(db, "Products"));
             var UserDocRef = doc(db, "Users",user.uid);
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
             setDoc( UserDocRef,{

              UserUid: user.uid,
              UserEmail: user.email,
              ProfilePicName: date.toLocaleTimeString() + userImg.name,
              UserName: userName,
              UserAddress: Number(houseNumber)+" "+ barangay+" "+ province +" "+ph,
              ProfileImg: url,
              UserType: "Buyer",
              ContactNumber: Number(phoneNumber),
              CreatedDate: date.toLocaleDateString() +" "+ date.toLocaleTimeString(),
                
          }).then(() => {
           
            setUserName("");
            setPhoneNumber("");
            setHouseNumber("");
            setBarangay("");
         
             
              setError('');
              document.getElementById('file').value = '';
              toast.success(" Your Account has been successfully created")
              setTimeout(() => {
              
                
              }, 3000)
            }).catch(err => setError(err.message))
          })
        
        });
      })
    }
    
  };


 
  const textboxhandle = (e) => {
    settextfieldValue(e.target.value);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    settextfieldValue(textfieldValue - (textfieldValue > 0 ? 1 : 0));
  };

  const handleIncrement = (e) => {
    e.preventDefault();
    settextfieldValue(textfieldValue + 1);
  };


  useEffect(() => {
  


  onAuthStateChanged(auth, async (user) => {
    setUserAuth(user);
  });
  const getData = async () => {

      try {
       
        const docRef = doc(db, "Products", product);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {

          setProducts(docSnap.data());

          const docRefUsers = doc(db, "Users", docSnap.data().SellerUid );
          const docSnapUsers = await getDoc(docRefUsers);
          setShops(docSnapUsers.data());
          
        } else {
          toast.error("No Product Dispaly");
        }
        //console.log("Document data:", docSnap.data());
       // console.log("Document data user:", docSnapUsers.data());
       // console.log("shop",shops.find(user => user.UserUid === products.SellerUid).ShopName)
      } catch (error) {
        console.log("error", error);
      }
    };
  
    return getData();

  // // const getData = async () => {

  // //     const docRef = doc(db, "Products", product);
  // //     const docSnap = await getDoc(docRef);
  // //     if (docSnap.exists()) {
  // //       setProducts(docSnap.data());

  // //       //   const collectionRefCart = collection(db, "Users");
  // //       //   const qCart = query(collectionRefCart, where(documentId(), "in", [products.SellerUid] ));
  // //       //   onSnapshot(qCart, (snapshot) =>
  // //       //   setShops(
  // //       //     snapshot.docs.map((doc) => ({
  // //       //       ...doc.data(),
  // //       //       id: doc.id,

  // //       //     }))
  // //       //   )
  // //       // );
  // //     } else {
  // //       toast.error("No Product Dispaly");
  // //     }
  // //     console.log("Document data:", docSnap.data());

  // // };
  // console.log("users",userData.users)
  // console.log("find",userData.users.find(user => user.UserUid === products.SellerUid ).ShopName)

  //     //console.log("findProduct",userData.findProduct);
  //     console.log("gago")
}, [product]);

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <span>{children}</span>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        //theme="dark"
      />
      {userAuth === null ? <NavbarmainNoUser /> : <Navbarmain />}

      {/*Modal if new user */}
      
      <Modal
        open={modalNewAccount}
        //onClose={handleClose}
      > 
      <Box sx={style.modalBox}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color="textPrimary">
            Setting up your account!
          </Typography>
        
           <TextField
                multiline
                variant="filled"
                size="small"
                fullWidth
                label="Name"
                inputProps={{
                  maxlength: CHARACTER_LIMIT,
                }}
                value={userName}
                helperText={`${userName.length}/${CHARACTER_LIMIT}`}
                onChange={handleChangeName}
                margin="normal"

              />

              <TextField
        
              sx={{mb:1}}
              size="small"
                multiline
                variant="filled"
                fullWidth
                label="Contact Number"
                inputProps={{
                  type: 'number',
                  maxlength: PHONE_LIMIT,
                 
                }}
                value={phoneNumber}
                helperText={`${phoneNumber.toString().length}/${PHONE_LIMIT}`}
                onChange={handleChangePhone}
            

              />

              <TextField
              sx={{mb:1}}
              size="small"
                multiline
                variant="filled"
                fullWidth
                label="House Number"
                inputProps={{
                  maxlength: HOUSE_LIMIT,
                }}
                value={houseNumber}
                helperText={`${houseNumber.toString().length}/${HOUSE_LIMIT}`}
                onChange={handleChangeHouse}
            

              />

          <Box sx={{ minWidth: 300 }}>
                <FormControl fullWidth variant="filled"  size="small">
                  <InputLabel id="demo-simple-select-label">
                   Barangay
                  </InputLabel>
                  <Select
                  sx={style.labelSelect}
                
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={barangay}
                    label="Barangay"
                    onChange={handleChangeBarangay}
                  >
                    <MenuItem value={"Bahay Pare"}>Bahay Pare</MenuItem>
                    <MenuItem value={"Bambang"}>Bambang</MenuItem>
                    <MenuItem value={"Barangca"}>Barangca</MenuItem>
                    <MenuItem value={"Buas (Poblacion)"}>Buas (Poblacion)</MenuItem>
                    <MenuItem value={"Cuayang Bugtong"}>Cuayang Bugtong</MenuItem>
                    <MenuItem value={"Dulong Ilog"}>Dulong Ilog</MenuItem>
                    <MenuItem value={"Gulap"}>Gulap</MenuItem>
                    <MenuItem value={"Lanang"}> Lanang </MenuItem>
                    <MenuItem value={"Magumbali"}> Magumbali</MenuItem>
                    <MenuItem value={"Mandasig"}>Mandasig</MenuItem>
                    <MenuItem value={"Mandili"}>Mandili</MenuItem>
                    <MenuItem value={"Mangga"}> Mangga </MenuItem>
                    <MenuItem value={"Mapaniqui"}> Mapaniqui </MenuItem>
                    <MenuItem value={"Paligui"}> Paligui </MenuItem>

                    <MenuItem value={"Pangclara"}>Pangclara</MenuItem>
                    <MenuItem value={"Pansinao"}>Pansinao</MenuItem>
                    <MenuItem value={"Paralaya (Poblacion)"}>Paralaya (Poblacion)</MenuItem>
                    <MenuItem value={"Pasig"}>Pasig</MenuItem>
                    <MenuItem value={"Pescadores (Poblacion)"}>Pescadores (Poblacion)</MenuItem>
                    <MenuItem value={"Pulong Gubat"}>Pulong Gubat</MenuItem>
                    <MenuItem value={"Pulong Palazan"}>Pulong Palazan</MenuItem>
                    <MenuItem value={"Salapungan"}> Salapungan </MenuItem>
                    <MenuItem value={"San Agustin (Poblacion)"}> San Agustin (Poblacion)</MenuItem>
                    <MenuItem value={"Santo Rosario"}>Santo Rosario</MenuItem>
                    <MenuItem value={"Tagulod"}>Tagulod</MenuItem>
                    <MenuItem value={"Talang"}> Talang </MenuItem>
                    <MenuItem value={"Tenejero"}> Tenejero </MenuItem>
                    <MenuItem value={"Vizal San Pablo"}> Vizal San Pablo </MenuItem>
                    <MenuItem value={"Vizal Santo Cristo"}> Vizal Santo Cristo </MenuItem>
                    <MenuItem value={"Vizal Santo Niño"}> Vizal Santo Niño</MenuItem>


                  
                  </Select>
                </FormControl>
              </Box>

      <Box sx={{ minWidth: 300,mt:3 }}>
       <FormControl  fullWidth variant="filled"  size="small">
        <InputLabel id="demo-simple-select-disabled-label">Municipality</InputLabel>
        <Select
  
          value={munipality}
          label="Municipality"
          onChange={handleChangeMunicipality}
          inputProps={{ readOnly: true }}
        >
          <MenuItem value="">
  
          </MenuItem>
          <MenuItem value={"Candaba"}>Candaba</MenuItem>
        </Select>
      </FormControl>
    </Box>

    <Box sx={{ minWidth: 300,mt:3 }}>
       <FormControl  fullWidth variant="filled"  size="small">
        <InputLabel id="demo-simple-select-disabled-label">Province</InputLabel>
        <Select
    
          value={province}
          label="Province"
          onChange={handleChangeProvince}
          inputProps={{ readOnly: true }}
        >
          <MenuItem value="">
  
          </MenuItem>
          <MenuItem value={"Pampanga"}>Pampanga</MenuItem>
        </Select>
      </FormControl>
      <Box>
      <Box sx={{mt:3, backgroundColor:"gray",height:"100%",}}>
                {/** 
                <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
                  <Button>Upload Product Image</Button>
                </Box>
              </Box>
                */}
                <Typography sx={{m:1}}color="textPrimary" fontSize="caption">Select your Agrishop Profile Picture</Typography>
               <Box sx={{ml:1}}>
                <input type="file" className='form-control' id="file" required
                  onChange={productImgHandler} />
                     </Box>
              </Box>

      </Box>
    </Box>
         
          <Button variant="contained"  onClick={buttonModalBack} sx={{mt:2,backgroundColor:"#EE4B2B"}}>Back</Button>
          <Button variant="contained"  onClick={buttonModalSave} sx={{mt:2,ml:2}}>Save</Button>
        </Box>

      </Modal>

    {/* End of Modal *?}



      {/*Container to ng Breadcrumbs*/}
      <Box sx={style.breadCrumbsContainer}>
      <Box sx={{alignItems: 'center', display: 'flex',
        flexDirection: 'column',paddingTop: {xs:'130px',lg:"100px"},}}>
        <Breadcrumbs aria-label="breadcrumb" sx={{fontSize:{xs:30,sm:40,lg:50}}}>
          <Link underline="hover" color="inherit" href="/"  >
            Home
          </Link>
    
          <Typography  sx={{fontSize:{xs:30,sm:40,lg:50}}} >Product Detail</Typography>
        </Breadcrumbs>

        </Box>
      </Box>
      {/*End of Breadcrumbs*/}

      {/*MainBody Start Here*/}
      <Box sx={style.mainContainer}>
        <Grid container spacing={5}>
          {/*Main Product Picture Dito*/}
          <Grid item xs={12} md={7} lg={6}>
            <Box sx={style.imgContainer}>
              <img
                alt="productDetail"
                src={products.ProductImg}
                style={{
                  margin: "auto",
                  display: "block",
                  maxWidth: "90%",
                  maxHeight: "90%",
                }}
              />
            </Box>
          </Grid>

          {/*Details Here*/}
          <Grid item xs={12} md={7} lg={6}>
            <Typography sx={style.productTitle} noWrap>
              {products.ProductName}
            </Typography>
            <Rating
              readOnly
              value={4}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
              sx={style.productRating}
            />
            <Typography sx={style.productPrice}>
              Php. {products.ProductSalePrice}.00 /Kilo
            </Typography>

            <Divider
              style={{
                width: "100%",
                backgroundColor: "#cdcdcd",
                marginTop: "15px",
              }}
            />
            <Box sx={style.boxDivider} />

            <Box sx={style.otherDetails}>
              <Typography sx={style.productBrandStore}>Seller:</Typography>
              <Typography sx={style.sellerName}>
               {shops.ShopName}
              </Typography>
            </Box>
            <Box sx={style.otherDetails}>
              <Typography sx={style.productBrandStore}>
                Product Code:
              </Typography>
              <Typography sx={style.sellerName}>20220105VEG0001</Typography>
            </Box>
            <Box sx={style.otherDetails}>
              <Typography sx={style.productBrandStore}>
                Availability:
              </Typography>
              {/*Product Availble*/}
              <Typography sx={style.productAvailable}>
                {" "}
                Stock Available
              </Typography>

              {/*Product NOT Availble*/}
              <Typography sx={style.productNotAvailable}>
                {" "}
                NOT Available
              </Typography>
            </Box>

            <Divider
              style={{
                width: "100%",
                backgroundColor: "#cdcdcd",
                marginTop: "15px",
              }}
            />
            <Box sx={style.boxDivider} />

            <Box sx={style.otherDetails}>
              <Typography sx={style.productDescription}>
                {products.ProductDesc}
              </Typography>
            </Box>

            <Divider
              style={{
                width: "100%",
                backgroundColor: "#cdcdcd",
                marginTop: "15px",
              }}
            />
            <Box sx={style.boxDivider} />

            <Box sx={style.shippingDetails}>
              <Typography sx={style.productBrandStore}>Shipping:</Typography>
              <Typography sx={style.productShippingDetails}>
                <MopedIcon sx={style.mopedIcon} />
                ₱40.00 {"[Standard Delivery Fee]"}
              </Typography>
            </Box>

            <Box sx={style.shippingDetails}>
              <Typography sx={style.productBrandStore}>Quantity:</Typography>

              <TextField
                sx={style.inputQuantity}
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      variant="filled"
                      position="end"
                      sx={style.adornment}
                    >
                      kg
                    </InputAdornment>
                  ),
                }}
                value={textfieldValue}
                onChange={textboxhandle}
              />

              {/*Decrement Button*/}
              <Button
                variant="contained"
                size="small"
                sx={style.decrementButton}
                onClick={handleDecrement}
              >
                <RemoveIcon />
              </Button>

              {/*Increment Button*/}
              <Button
                variant="contained"
                size="small"
                sx={style.incrementButton}
                
                onClick={handleIncrement}
              >
                <AddIcon />
              </Button>
            </Box>

            <Box sx={style.buttonIcons}>
              <Button
                variant="contained"
                sx={style.addtocartButton}
               // disabled={userAuth === null ? true : false}
               onClick={()=>buttonAddToCart(products.SellerUid)}
              >
                Add to Cart
              </Button>

              <Button
                variant="contained"
                sx={style.buynowButton}
                //disabled={userAuth === null ? true : false}
                onClick={() => buttonBuy(products.SellerUid)}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box style={{ marginBottom: "50px" }}>
          <Box sx={style.productReviewContainer}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={style.tabMain}
              variant="scrollable"
              allowScrollButtonsMobile
              TabIndicatorProps={{
                style: {
                  backgroundColor: "transparent",
                },
              }}
            >
              <Tab
                disableRipple
                label="Product Review"
                {...a11yProps(0)}
                sx={style.productTabs}
              />
              <Tab
                disableRipple
                label="Store"
                {...a11yProps(1)}
                sx={style.productTabs}
              />
              <Tab
                disableRipple
                label="Additional Information"
                {...a11yProps(2)}
                sx={style.productTabs}
              />
            </Tabs>

            {/*Product Review*/}
            <TabPanel
              value={value}
              index={0}
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <Box sx={style.rateSorter}>
                <Button variant="outlined" sx={style.buttonSorter}>
                  All Comments
                </Button>
                <Button variant="outlined" sx={style.buttonSorter}>
                  5 Stars
                </Button>
                <Button variant="outlined" sx={style.buttonSorter}>
                  4 Stars
                </Button>
                <Button variant="outlined" sx={style.buttonSorter}>
                  3 Stars
                </Button>
                <Button variant="outlined" sx={style.buttonSorter}>
                  2 Stars
                </Button>
                <Button variant="outlined" sx={style.buttonSorter}>
                  1 Star
                </Button>
              </Box>
              <Box sx={style.boxReviewContainer}>
                <Box sx={style.reviewBox}>
                  <Avatar alt="commenter" src={bryce} />
                </Box>
                <Box sx={style.commentHead}>
                  <Typography sx={style.nameComment}>
                    Bryce Angel Ganotice
                  </Typography>

                  <Rating
                    readOnly
                    value={4}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                    sx={style.productRating}
                  />

                  <Typography sx={style.mainComment}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Exercitationem ut dolores accusantium, dignissimos sint
                    laudantium! Recusandae ducimus vel suscipit animi odio?
                    Repudiandae voluptas quibusdam dolorem ut velit. Debitis,
                    nam nihil.
                  </Typography>

                  <Box sx={style.commentContainer}>
                    <img
                      alt="commen1"
                      src={chickenMeat}
                      style={{
                        height: "80px",
                        width: "80px",
                        marginRight: "10px",
                      }}
                    />

                    <img
                      alt="commen2"
                      src={chickenMeatHover}
                      style={{
                        height: "80px",
                        width: "80px",
                      }}
                    />
                  </Box>

                  <Typography sx={style.timeDate}>2022-01-05 02:25</Typography>
                </Box>
              </Box>
            </TabPanel>

            {/*Store Information*/}
            <TabPanel
              value={value}
              index={1}
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <Box sx={style.storeContainer}>
                <Box sx={style.storeInfo}>
                  <Box sx={style.storePicture}>
                    <Avatar
                      alt="storePicture"
                      src={shops.ProfileImg}
                      sx={style.storeAvatar}
                    />
                  </Box>
                  <Box sx={style.storeText}>
                    <Typography sx={style.storeName}>
                      {shops.ShopName}
                    </Typography>
                    <Typography sx={style.storeAddress}>
                     {shops.PickUpAddress}
                    </Typography>

                    <Button variant="outlined" sx={style.chatStoreButton} onClick={() => buttonChat(products.SellerUid)}>
                      <ForumIcon
                        style={{ fontSize: "16px", marginRight: "5px" }}
                      />
                      Chat Now
                    </Button>

                    <Button
                      variant="contained"
                      sx={style.viewStoreButton}
                      onClick={() => buttonViewShop(products.SellerUid)}
                    >
                      <StorefrontIcon
                        style={{ fontSize: "16px", marginRight: "5px" }}
                      />
                      View Shop
                    </Button>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel
              value={value}
              index={2}
              style={{ backgroundColor: "#f5f5f5" }}
            >
              <Typography style={{ fontFamily: "Poppins", fontSize: "15px" }}>
                No more information
              </Typography>
            </TabPanel>
          </Box>
        </Box>

        <Box sx={style.suggestTitle}>
          <Typography variant="h1" sx={style.productHead}>
            Suggested Products
          </Typography>
        </Box>

        <Box>
          <Grid container sx={style.productSliderContainer}>
            {/*Card 1*/}
            <Grid item sx={style.cardItem2}>
              <Card sx={style.cardWrapper}>
                <Box>
                  <Grid container spacing={1} sx={style.cardHeader}>
                    <Grid item>
                      <Avatar src={bryce} atl="Store Name" />
                    </Grid>
                    <Grid item>
                      <Typography sx={style.storeNameCard}>
                        Bryce Ganotice's Store
                      </Typography>
                      <Typography sx={style.soldCount}>100kgs Sold</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <CardMedia
                  component="img"
                  height="120"
                  image={chickenMeat}
                  alt="Chicken Meat"
                />
                <CardContent>
                  <Typography sx={style.cardTitle}>Chicken Breast</Typography>
                  <Rating
                    readOnly
                    value={4}
                    sx={style.cardStars}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />

                  <Typography sx={style.cardPrice}>
                    Php. 500.00 / Kilo
                  </Typography>
                  <Typography sx={style.cardDescription}>
                    Lorem ipsum donor site amet amen sample text
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" sx={style.cardButton1}>
                    Add to Cart
                  </Button>
                  <Button variant="contained" sx={style.cardButton2}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/*Card 1*/}
            <Grid item sx={style.cardItem2}>
              <Card sx={style.cardWrapper}>
                <Box>
                  <Grid container spacing={1} sx={style.cardHeader}>
                    <Grid item>
                      <Avatar src={bryce} atl="Store Name" />
                    </Grid>
                    <Grid item>
                      <Typography sx={style.storeNameCard}>
                        Bryce Ganotice's Store
                      </Typography>
                      <Typography sx={style.soldCount}>100kgs Sold</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <CardMedia
                  component="img"
                  height="120"
                  image={chickenMeat}
                  alt="Chicken Meat"
                />
                <CardContent>
                  <Typography sx={style.cardTitle}>Chicken Breast</Typography>
                  <Rating
                    readOnly
                    value={4}
                    sx={style.cardStars}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />

                  <Typography sx={style.cardPrice}>
                    Php. 500.00 / Kilo
                  </Typography>
                  <Typography sx={style.cardDescription}>
                    Lorem ipsum donor site amet amen sample text
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" sx={style.cardButton1}>
                    Add to Cart
                  </Button>
                  <Button variant="contained" sx={style.cardButton2}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/*Card 1*/}
            <Grid item sx={style.cardItem2}>
              <Card sx={style.cardWrapper}>
                <Box>
                  <Grid container spacing={1} sx={style.cardHeader}>
                    <Grid item>
                      <Avatar src={bryce} atl="Store Name" />
                    </Grid>
                    <Grid item>
                      <Typography sx={style.storeNameCard}>
                        Bryce Ganotice's Store
                      </Typography>
                      <Typography sx={style.soldCount}>100kgs Sold</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <CardMedia
                  component="img"
                  height="120"
                  image={chickenMeat}
                  alt="Chicken Meat"
                />
                <CardContent>
                  <Typography sx={style.cardTitle}>Chicken Breast</Typography>
                  <Rating
                    readOnly
                    value={4}
                    sx={style.cardStars}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />

                  <Typography sx={style.cardPrice}>
                    Php. 500.00 / Kilo
                  </Typography>
                  <Typography sx={style.cardDescription}>
                    Lorem ipsum donor site amet amen sample text
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" sx={style.cardButton1}>
                    Add to Cart
                  </Button>
                  <Button variant="contained" sx={style.cardButton2}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>

            {/*Card 1*/}
            <Grid item sx={style.cardItem2}>
              <Card sx={style.cardWrapper}>
                <Box>
                  <Grid container spacing={1} sx={style.cardHeader}>
                    <Grid item>
                      <Avatar src={bryce} atl="Store Name" />
                    </Grid>
                    <Grid item>
                      <Typography sx={style.storeNameCard}>
                        Bryce Ganotice's Store
                      </Typography>
                      <Typography sx={style.soldCount}>100kgs Sold</Typography>
                    </Grid>
                  </Grid>
                </Box>
                <CardMedia
                  component="img"
                  height="120"
                  image={chickenMeat}
                  alt="Chicken Meat"
                />
                <CardContent>
                  <Typography sx={style.cardTitle}>Chicken Breast</Typography>
                  <Rating
                    readOnly
                    value={4}
                    sx={style.cardStars}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />

                  <Typography sx={style.cardPrice}>
                    Php. 500.00 / Kilo
                  </Typography>
                  <Typography sx={style.cardDescription}>
                    Lorem ipsum donor site amet amen sample text
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" sx={style.cardButton1}>
                    Add to Cart
                  </Button>
                  <Button variant="contained" sx={style.cardButton2}>
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/*MainBody End Here*/}

      <Footer />
    </Box>
  );
};

export default Productdetail;
