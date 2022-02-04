import React, { useState, useEffect } from "react";
import style from "../styles/Profile";

import Navbarmain from "../components/NavbarMain";
import Footer from "../components/Footer";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import GrassOutlinedIcon from "@mui/icons-material/GrassOutlined";

import ReceiptIcon from "@mui/icons-material/Receipt";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import MopedIcon from "@mui/icons-material/Moped";
import MoveToInboxIcon from "@mui/icons-material/MoveToInbox";
// import StarOutlineIcon from '@mui/icons-material/StarOutline';

//toast
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Tabs,
  Tab,
  TextField,
  Select,
  MenuItem,
  Modal,
  Stepper,
  Step,
  StepLabel,
  Stack,
  FormControl,
  InputLabel,
  Breadcrumbs,
  Link,
} from "@mui/material";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";

// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';
// import DatePicker from '@mui/lab/DatePicker';
//backend
import { onAuthStateChanged } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth, db, storage } from "../utils/firebase";
import {
  where,
  collection,
  query,
  onSnapshot,
  setDoc,
  Timestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useHistory } from "react-router-dom";

const Profile = () => {
  const userData = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const history = useHistory();
  const [userAuth, setUserAuth] = useState([
    {
      uid: "initial",
    },
  ]);

  const [userName, setUserName] = React.useState("");
  const [barangay, setBarangay] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState(0);
  const [houseNumber, setHouseNumber] = React.useState(0);
  const [munipality, setMunicipality] = React.useState("Candaba");
  const [province, setProvince] = React.useState("Pampanga");
  const date = new Date();
  const [userImg, setUserImg] = useState(null);
  const [, setError] = useState("");
  const [modalNewAccount, setModalNewAccount] = useState(false);

  const CHARACTER_LIMIT = 50;
  const PHONE_LIMIT = 11;
  const HOUSE_LIMIT = 5;
  const types = ["image/png", "image/jpeg"]; // image types

  const productImgHandler = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setUserImg(selectedFile);
      setError("");
    } else {
      setUserImg(null);
      setError("Please select a valid image type (jpg or png)");
    }
  };

  //button

  const buttonModalBack = () => {
    history.push("/");
  };
  const buttonModalSave = () => {
    const ph = "Philippines";

    if (
      userName === "" ||
      houseNumber === 0 ||
      barangay === "" ||
      userImg === null ||
      phoneNumber === 0
    ) {
      toast.error("All Field Required");
    } else {
      onAuthStateChanged(auth, (user) => {
        const storageRef = ref(
          storage,
          `users-images/${date.toLocaleTimeString() + userImg.name}`
        );
        const uploadTask = uploadBytesResumable(storageRef, userImg, types);

        // const uploadTask = ref(storage, `product-images/${productImg.name}`).put(productImg);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
          },
          (err) => setError(err.message),
          () => {
            //  const UserDocRef = doc(collection(db, "Products"));
            var UserDocRef = doc(db, "Users", user.uid);
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setDoc(UserDocRef, {
                UserUid: user.uid,
                UserEmail: user.email,
                ProfilePicName: date.toLocaleTimeString() + userImg.name,
                UserName: userName,
                UserAddress:
                  Number(houseNumber) +
                  " " +
                  barangay +
                  " " +
                  province +
                  " " +
                  ph,
                ProfileImg: url,
                UserType: "Buyer",
                ContactNumber: Number(phoneNumber),
                CreatedDate:
                  date.toLocaleDateString() + " " + date.toLocaleTimeString(),
              })
                .then(() => {
                  setUserName("");
                  setPhoneNumber("");
                  setHouseNumber("");
                  setBarangay("");

                  setError("");
                  document.getElementById("file").value = "";
                  toast.success(" Your Account has been successfully created");
                  setTimeout(() => {}, 3000);
                })
                .catch((err) => setError(err.message));
            });
          }
        );
      });
    }
  };

  const buttonViewShop = (id) => {
    window.scrollTo(0, 0);
    history.push(`/shoppage?shop=${id}`);
  };

  const buttonChat = (id) => {
    if (userAuth === null) {
      //toast.error("You need to login first");
      window.scrollTo(0, 0);

      history.push("/login");
    } else if (userAuth.uid === id) {
      toast.error("You cant chat yourself");
    } else {
      // console.log("add to cart", product);

      toast.success("Successfully add to your chat");
      auth.onAuthStateChanged((user) => {
        if (
          userData.chatUser.find(
            (chat) =>
              chat.UserUid === userAuth.uid &&
              chat.SellerUid === id &&
              chat.UserUid === userAuth.uid &&
              chat.SellerUid === id
          )
        ) {
          //alert("already on chat")
          window.scrollTo(0, 0);
          history.push("/chat");
        } else {
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
            name: userData.users.find((user) => user.id === id).ShopName,
            createdAt: Timestamp.fromDate(new Date()),
            isOnline: false,
          };
          setDoc(newUserChat1, data1);

          history.push("/chat");
        }
      });
    }
  };

  const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 136deg, rgb(46, 138, 0) 0%, rgb(62, 168, 8) 50%, rgb(120, 204, 37) 100%)",
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      [`& .${stepConnectorClasses.line}`]: {
        backgroundImage:
          "linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)",
      },
    },
    [`& .${stepConnectorClasses.line}`]: {
      height: 3,
      border: 0,
      backgroundColor:
        theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
      borderRadius: 1,
    },
  }));

  const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
    ...(ownerState.active && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(46, 138, 0) 0%, rgb(62, 168, 8) 50%, rgb(120, 204, 37) 100%)",
      boxShadow: "0 4px 10px 0 rgba(0,0,0,.15)",
    }),
    ...(ownerState.completed && {
      backgroundImage:
        "linear-gradient( 136deg, rgb(46, 138, 0) 0%, rgb(62, 168, 8) 50%, rgb(120, 204, 37) 100%)",
    }),
  }));

  function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
      1: <ReceiptIcon />,
      2: <MonetizationOnIcon />,
      3: <MopedIcon />,
      4: <MoveToInboxIcon />,
    };

    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {icons[String(props.icon)]}
      </ColorlibStepIconRoot>
    );
  }

  ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
  //handle Change
 
  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeBarangay = (event) => {
    setBarangay(event.target.value);
  };
  const handleChangeMunicipality = (event) => {
    setMunicipality(event.target.value);
  };
  const handleChangeProvince = (event) => {
    setProvince(event.target.value);
  };
  const handleChangePhone = (event) => {
    const re = /^[0-9\b]+$/;

    if (event.target.value === "" || re.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
  };
  const handleChangeHouse = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setHouseNumber(event.target.value);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUserAuth(user);

      const collectionRefOrderHistory = collection(db, "Orders");
      const qOrderHistory = query(
        collectionRefOrderHistory,
        where("BuyerUid", "==", user.uid)
      );
      onSnapshot(qOrderHistory, (snapshot) =>
        setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setModalNewAccount(false);
        console.log("data exist");
      } else {
        setModalNewAccount(true);
        console.log("not exist");
        console.log(user.email);
      }
    });
  }, [userData]);

  const orderStep = [
    <Box sx={style.orderStatusContainer}>
      <Typography sx={style.orderStatusTitle}>Order Placed</Typography>
      {/* <Typography sx={style.orderStatusDate}>02/02/2022 18:02</Typography> */}
    </Box>,
    <Box sx={style.orderStatusContainer}>
      <Typography sx={style.orderStatusTitle}>Payment Confirmed</Typography>
      {/* <Typography sx={style.orderStatusDate}>02/02/2022 18:02</Typography> */}
    </Box>,
    <Box sx={style.orderStatusContainer}>
      <Typography sx={style.orderStatusTitle}>Shipping</Typography>
      {/* <Typography sx={style.orderStatusDate}>02/02/2022 18:02</Typography> */}
    </Box>,
    <Box sx={style.orderStatusContainer}>
      <Typography sx={style.orderStatusTitle}>Received</Typography>
      {/* <Typography sx={style.orderStatusDate}>02/02/2022 18:02</Typography> */}
    </Box>,
  ];

  
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ backgroundColor: "#f0f0f0" }}>
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

      <Navbarmain />

      {/*Container to ng Breadcrumbs*/}
      <Box sx={style.breadCrumbsContainer}>
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            paddingTop: { xs: "130px", lg: "100px" },
          }}
        >
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontSize: { xs: 30, sm: 40, lg: 50 } }}
          >
            <Link underline="hover" color="inherit" href="/">
              Home
            </Link>

            <Typography sx={{ fontSize: { xs: 30, sm: 40, lg: 50 } }}>
             Profile
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>
      {/*End of Breadcrumbs*/}

      {/*Modal if new user */}

      <Modal
        open={modalNewAccount}
        //onClose={handleClose}
      >
        <Box sx={style.modalBox}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="textPrimary"
          >
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
            sx={{ mb: 1 }}
            size="small"
            multiline
            variant="filled"
            fullWidth
            label="Contact Number"
            inputProps={{
              type: "number",
              maxlength: PHONE_LIMIT,
            }}
            value={phoneNumber}
            helperText={`${phoneNumber.toString().length}/${PHONE_LIMIT}`}
            onChange={handleChangePhone}
          />

          <TextField
            sx={{ mb: 1 }}
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
            <FormControl fullWidth variant="filled" size="small">
              <InputLabel id="demo-simple-select-label">Barangay</InputLabel>
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
                <MenuItem value={"Paralaya (Poblacion)"}>
                  Paralaya (Poblacion)
                </MenuItem>
                <MenuItem value={"Pasig"}>Pasig</MenuItem>
                <MenuItem value={"Pescadores (Poblacion)"}>
                  Pescadores (Poblacion)
                </MenuItem>
                <MenuItem value={"Pulong Gubat"}>Pulong Gubat</MenuItem>
                <MenuItem value={"Pulong Palazan"}>Pulong Palazan</MenuItem>
                <MenuItem value={"Salapungan"}> Salapungan </MenuItem>
                <MenuItem value={"San Agustin (Poblacion)"}>
                  {" "}
                  San Agustin (Poblacion)
                </MenuItem>
                <MenuItem value={"Santo Rosario"}>Santo Rosario</MenuItem>
                <MenuItem value={"Tagulod"}>Tagulod</MenuItem>
                <MenuItem value={"Talang"}> Talang </MenuItem>
                <MenuItem value={"Tenejero"}> Tenejero </MenuItem>
                <MenuItem value={"Vizal San Pablo"}> Vizal San Pablo </MenuItem>
                <MenuItem value={"Vizal Santo Cristo"}>
                  {" "}
                  Vizal Santo Cristo{" "}
                </MenuItem>
                <MenuItem value={"Vizal Santo Niño"}>
                  {" "}
                  Vizal Santo Niño
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 300, mt: 3 }}>
            <FormControl fullWidth variant="filled" size="small">
              <InputLabel id="demo-simple-select-disabled-label">
                Municipality
              </InputLabel>
              <Select
                value={munipality}
                label="Municipality"
                onChange={handleChangeMunicipality}
                inputProps={{ readOnly: true }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Candaba"}>Candaba</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ minWidth: 300, mt: 3 }}>
            <FormControl fullWidth variant="filled" size="small">
              <InputLabel id="demo-simple-select-disabled-label">
                Province
              </InputLabel>
              <Select
                value={province}
                label="Province"
                onChange={handleChangeProvince}
                inputProps={{ readOnly: true }}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value={"Pampanga"}>Pampanga</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <Box sx={{ mt: 3, backgroundColor: "gray", height: "100%" }}>
                {/** 
                <Box component="span" sx={{ p: 2, border: "1px dashed grey" }}>
                  <Button>Upload Product Image</Button>
                </Box>
              </Box>
                */}
                <Typography
                  sx={{ m: 1 }}
                  color="textPrimary"
                  fontSize="caption"
                >
                  Select your Agrishop Profile Picture
                </Typography>
                <Box sx={{ ml: 1 }}>
                  <input
                    type="file"
                    className="form-control"
                    id="file"
                    required
                    onChange={productImgHandler}
                  />
                </Box>
              </Box>
            </Box>
          </Box>

          <Button
            variant="contained"
            onClick={buttonModalBack}
            sx={{ mt: 2, backgroundColor: "#EE4B2B" }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={buttonModalSave}
            sx={{ mt: 2, ml: 2 }}
          >
            Save
          </Button>
        </Box>
      </Modal>

      {/* End of Modal */}

      <Box>
        <Grid container>
          <Grid item xs>
            <Box sx={style.profilePictureContainer}>
              <Avatar
                alt="profile picture"
                src={userData.myuserdata.map((userdata) => userdata.ProfileImg)}
                sx={style.profilePicture}
              />
              <Typography sx={style.profileName}>
                {userData.myuserdata.map((userdata) => userdata.UserName)}
              </Typography>
            </Box>

            <Box sx={style.menuLinkContainer}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                orientation="vertical"
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "transparent",
                  },
                }}
                sx={style.tabsStyle}
              >
                <Tab
                  disableRipple
                  icon={<AccountCircleOutlinedIcon sx={style.profileIcon} />}
                  label="My Profile"
                  {...a11yProps(0)}
                  sx={style.profileTab}
                />
                <Tab
                  disableRipple
                  icon={<PlaceOutlinedIcon sx={style.profileIcon} />}
                  label="My Addresses"
                  {...a11yProps(1)}
                  sx={style.profileTab}
                />
                <Tab
                  disableRipple
                  icon={<GrassOutlinedIcon sx={style.profileIcon} />}
                  label="My Order"
                  {...a11yProps(2)}
                  sx={style.profileTab}
                />
              </Tabs>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={9.5} xl={9.5}>
            <TabPanel value={value} index={0}>
              <Box sx={style.panelContainer}>
                <Box sx={style.titleContainer}>
                  <Typography sx={style.profileTitle1}>My Profile</Typography>
                  <Typography sx={style.profileInstructionText}>
                    Manage your Account
                  </Typography>
                </Box>
                <hr
                  style={{
                    width: "95%",
                    margin: "auto",
                    opacity: ".3",
                  }}
                />

                <Grid container>
                  <Grid item xs={12} sm={12} md={9} lg={8}>
                    <Box sx={style.fieldMain}>
                      {/* <Box sx={style.fieldContainer}>
                                                <Box sx={style.optionTextContainer}><Typography sx={style.optionText}>Username</Typography></Box>
                                                <TextField sx={style.userName} />
                                            </Box> */}
                      <Box sx={style.fieldContainer}>
                        <Box sx={style.optionTextContainer}>
                          <Typography sx={style.optionText}>Name</Typography>
                        </Box>
                        <TextField
                          sx={style.userName}
                          defaultValue={userData.myuserdata.map(
                            (userdata) => userdata.UserName
                          )}
                        />
                      </Box>
                      <Box sx={style.fieldContainer}>
                        <Box sx={style.optionTextContainer}>
                          <Typography sx={style.optionText}>Email</Typography>
                        </Box>
                        <TextField
                          sx={style.userName}
                          defaultValue={userData.myuserdata.map(
                            (userdata) => userdata.UserEmail
                          )}
                        />
                      </Box>
                      <Box sx={style.fieldContainer}>
                        <Box sx={style.optionTextContainer}>
                          <Typography sx={style.optionText}>
                            Contact No.
                          </Typography>
                        </Box>
                        <TextField
                          sx={style.userName}
                          defaultValue={userData.myuserdata.map(
                            (userdata) => userdata.ContactNumber
                          )}
                        />
                      </Box>
                      {/* <Box sx={style.fieldContainer}>
                                                <Box sx={style.optionTextContainer}><Typography sx={style.optionText}>Birthday</Typography></Box>
                                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                    <DatePicker
                                                        label="Basic example"
                                                        value={dateValue}
                                                        onChange={(newDateValue) => {
                                                            setDateValue(newDateValue);
                                                        }}
                                                        renderInput={(params) => <TextField sx={style.datePicker}{...params} InputLabelProps={{ shrink: false }} label="" />}
                                                    />
                                                </LocalizationProvider>
                                            </Box> */}
                    </Box>
                    <Box sx={style.buttonContainer}>
                      <Button variant="contained" sx={style.saveButton}>
                        Save
                      </Button>
                    </Box>
                  </Grid>

                  <Grid item xs>
                    <Box sx={style.proPicContainer}>
                      <Avatar
                        alt="profile picture"
                        src={userData.myuserdata.map(
                          (userdata) => userdata.ProfileImg
                        )}
                        sx={style.proPic}
                      />
                      <Button variant="contained" sx={style.uploadImage}>
                        Select Image
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={1}>
              <Box sx={style.panelContainer}>
                <Box sx={style.titleContainer}>
                  <Typography sx={style.profileTitle1}>My Addresses</Typography>
                  <Typography sx={style.profileInstructionText}>
                    The following addresses will be used on the checkout page by
                    default.
                  </Typography>
                </Box>
                <hr
                  style={{
                    width: "95%",
                    margin: "auto",
                    opacity: ".3",
                  }}
                />

                <Box>
                  <Box sx={style.warningContainer}>
                    {userData.myuserdata.map((user) => user.UserAddress) ===
                    "" ? (
                      <Box sx={style.warning1}>
                        <Typography sx={style.warning1Text}>
                          No address save yet.
                        </Typography>
                      </Box>
                    ) : (
                      <Box sx={style.warning2}>
                        <Typography sx={style.warning1Text}>
                          Address Save.
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  <Box sx={style.addressContainer}>
                    <Box sx={style.address1}>
                      <Typography sx={style.addressText}>
                        Street Address
                      </Typography>
                      <TextField
                        placeholder="House number and street name"
                        sx={style.streetAddress}
                        defaultValue={userData.myuserdata.map(
                          (userdata) => userdata.UserAddress
                        )}
                      />
                      <TextField
                        placeholder="Apartment, suite, unit etc. (Optional)"
                        sx={style.streetAddress}
                      />
                    </Box>

                    <Box sx={style.address1}>
                      <Typography sx={style.addressText}>Baranggay</Typography>
                      <Select
                        sx={style.baranggayChoice}
                        MenuProps={{
                          anchorOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          transformOrigin: {
                            vertical: "bottom",
                            horizontal: "left",
                          },
                          getContentAnchorEl: null,
                        }}
                      >
                        <MenuItem value={1}>Bahay Pare</MenuItem>
                        <MenuItem value={2}>Bambang</MenuItem>
                        <MenuItem value={3}>Barangca</MenuItem>
                        <MenuItem value={4}>Barit</MenuItem>
                        <MenuItem value={5}>Buas</MenuItem>
                        <MenuItem value={6}>Cuayang Bugtong</MenuItem>
                        <MenuItem value={7}>Dalayap</MenuItem>
                        <MenuItem value={8}>Dulong Ilog</MenuItem>
                        <MenuItem value={9}>Gulap</MenuItem>
                        <MenuItem value={10}>Lanang</MenuItem>
                        <MenuItem value={11}>Lourdes</MenuItem>
                        <MenuItem value={12}>Magumbali</MenuItem>
                        <MenuItem value={13}>Mandasig</MenuItem>
                        <MenuItem value={14}>Mandili</MenuItem>
                        <MenuItem value={15}>Mangga</MenuItem>
                        <MenuItem value={16}>Mapaniqui</MenuItem>
                        <MenuItem value={17}>Paligui</MenuItem>
                        <MenuItem value={18}>Pangclara</MenuItem>
                        <MenuItem value={19}>Pansinao</MenuItem>
                        <MenuItem value={20}>Paralaya</MenuItem>
                        <MenuItem value={21}>Pasig</MenuItem>
                        <MenuItem value={22}>Pescadores</MenuItem>
                        <MenuItem value={23}>Pulong Gubat</MenuItem>
                        <MenuItem value={24}>Pulong Palazan</MenuItem>
                        <MenuItem value={25}>Salapungan</MenuItem>
                        <MenuItem value={26}>San Augustin</MenuItem>
                        <MenuItem value={27}>Santo Rosario</MenuItem>
                        <MenuItem value={28}>Tagulod</MenuItem>
                        <MenuItem value={29}>Talang</MenuItem>
                        <MenuItem value={30}>Tenejero</MenuItem>
                        <MenuItem value={31}>Vizal San Pablo</MenuItem>
                        <MenuItem value={32}>Vizal Santo Cristo</MenuItem>
                        <MenuItem value={33}>Vizal Santo Niño</MenuItem>
                      </Select>
                    </Box>

                    <Box sx={style.address1}>
                      <Typography sx={style.addressText}>Town/City</Typography>
                      <TextField
                        defaultValue="Candaba, Pampanga"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={style.streetAddress}
                      />
                      <Typography sx={style.addressText}>Country</Typography>
                      <TextField
                        defaultValue="Philippines"
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={style.streetAddress}
                      />
                    </Box>

                    <Box sx={style.buttonSaveAddressContainer}>
                      <Button variant="contained" sx={style.buttonSaveAddress}>
                        Save Address
                      </Button>
                    </Box>
                  </Box>

                  <Box sx={{ width: "100%", padding: "10px" }}>
                    <Button variant="contained" sx={style.newAddress}>
                      Add New Address
                    </Button>
                  </Box>

                  <Box sx={style.addDetails}>
                    <Box sx={style.spare}>
                      <Box sx={style.mainAddCon}>
                        <Box sx={style.addCon}>
                          <Box sx={style.nameAddressContainer}>
                            <Typography sx={style.nameAddress}>
                              {userData.myuserdata.map(
                                (userdata) => userdata.UserName
                              )}
                            </Typography>
                          </Box>
                          <Typography sx={style.addressStatus}>
                            Default
                          </Typography>
                          <Box>
                            <Typography sx={style.contactNumber}>
                              {" "}
                              {userData.myuserdata.map(
                                (userdata) => userdata.ContactNumber
                              )}
                            </Typography>
                            <Typography sx={style.mainAddress}>
                              {" "}
                              {userData.myuserdata.map(
                                (userdata) => userdata.UserAddress
                              )}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                      <Box sx={style.buttonContainer}>
                        <Button
                          variant="contained"
                          sx={style.editAddressButton}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          sx={style.defaultAddressButton}
                        >
                          Default
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={value} index={2}>
              <Box sx={style.panelContainer}>
                <Box sx={style.titleContainer}>
                  <Typography sx={style.profileTitle1}>My Orders</Typography>
                  <Typography sx={style.profileInstructionText}>
                    The following addresses will be used on the checkout page by
                    default.
                  </Typography>
                </Box>
                <hr
                  style={{
                    width: "95%",
                    margin: "auto",
                    opacity: ".3",
                  }}
                />
                {orders.length === 0 ? (
                  <Box sx={{ padding: "10px" }}>
                    <Box sx={style.orderNotif}>
                      <Typography sx={style.orderWarning}>
                        No order has been made yet.
                      </Typography>
                    </Box>
                  </Box>
                ) : (
                  ""
                )}

                {orders.map((order, key) => (
                  <Box sx={style.orderMainContainer} key={key + 1}>
                    <Box>
                      <Box sx={style.orderHeader}>
                        <Avatar
                          alt="store picture"
                          src={
                            userData.users.find(
                              (user) => user.UserUid === order.SellerUid
                            ).ProfileImg
                          }
                          sx={style.shopPicture}
                        />
                        <Typography sx={style.shopName}>
                          {
                            userData.users.find(
                              (user) => user.UserUid === order.SellerUid
                            ).ShopName
                          }
                        </Typography>
                        <Button
                          variant="contained"
                          sx={style.chatButton}
                          onClick={() => buttonChat(order.SellerUid)}
                        >
                          Chat
                        </Button>
                        <Button
                          variant="outlined"
                          sx={style.viewShopButton}
                          onClick={() => buttonViewShop(order.SellerUid)}
                        >
                          View Shop
                        </Button>
                      </Box>

                      <hr
                        style={{
                          width: "95%",
                          margin: "auto",
                          opacity: ".3",
                        }}
                      />

                      <Grid container sx={{ justifyContent: "space-between" }}>
                        <Grid item>
                          <Box sx={style.orderInfoContainer}>
                            <img
                              alt="product"
                              src={order.ProductImage}
                              style={{
                                objectFit: "cover",
                                width: "120px",
                                height: "120px",
                                marginRight: "10px",
                              }}
                            />
                            <Box>
                              <Box sx={style.paymentContainer}>
                                {order.Payment === "COD" ? (
                                  <Typography sx={style.paymentType1}>
                                    COD
                                  </Typography>
                                ) : (
                                  <Typography sx={style.paymentType2}>
                                    Paid
                                  </Typography>
                                )}
                              </Box>

                              <Typography sx={style.productTitle} noWrap>
                                {order.ProductName}
                              </Typography>
                              <Typography sx={style.productOrderID} noWrap>
                                {" "}
                                {order.ProductId}
                              </Typography>
                              <Typography sx={style.orderQty}>
                                {order.ProductQty} Kilogram{" "}
                                {order.ProductQty >= 2 ? "'s" : ""}
                              </Typography>
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item sx={style.gridButtonContainer}>
                          <Box sx={style.orderPriceContainer}>
                            <Typography sx={style.orderStatus} noWrap>
                              <b>Order Status: </b> {order.OrderStatus}
                            </Typography>
                            <Typography sx={style.orderPrice}>
                              <b>Total Order: </b> {order.Total}.00
                            </Typography>
                          </Box>

                          <Box sx={style.orderButtonContainer}>
                            <Button
                              variant="contained"
                              sx={style.checkProductButton}
                              onClick={handleOpen}
                            >
                              Check Product
                            </Button>

                            <Button
                              variant="contained"
                              color="primary"
                              sx={style.checkProductButton}
                              disabled={
                                order.OrderStatus === "Ordered Delivered"
                                  ? false
                                  : true
                              }
                            >
                              Rate
                            </Button>
                          </Box>

                          <Modal open={open} onClose={handleClose}>
                            <Box sx={style.modalContainer}>
                              <Grid
                                container
                                sx={{
                                  justifyContent: "space-between",
                                  backgroundColor: "#479923",
                                }}
                              >
                                <Grid item>
                                  <Box sx={style.productTitleModal}>
                                    <Typography sx={style.productOrderModal}>
                                      {order.ProductName}
                                    </Typography>
                                  </Box>
                                </Grid>
                                <Grid item>
                                  <Box sx={style.productTitleModal}>
                                    <Typography sx={style.productOrderModal}>
                                      {" "}
                                      {order.OrderId}
                                    </Typography>
                                  </Box>
                                </Grid>
                              </Grid>
                              {/*TIMELINE*/}
                              <Box>
                                <Box sx={{ width: "100%", marginTop: "10px" }}>
                                  <Stack sx={{ width: "100%" }} spacing={1}>
                                    <Stepper
                                      alternativeLabel
                                      activeStep={
                                        order.SellerCancel === true
                                          ? 0
                                          : order.OrderStatus === "To Pay"
                                          ? 0
                                          : order.OrderStatus ===
                                            "Seller preparing your order"
                                          ? 1
                                          : order.OrderStatus ===
                                            "Rider delivering your order"
                                          ? 2
                                          : order.OrderStatus ===
                                            "Ordered Delivered"
                                          ? 3
                                          : 4
                                      }
                                      connector={<ColorlibConnector />}
                                    >
                                      {orderStep.map((label) => (
                                        <Step key={label}>
                                          <StepLabel
                                            StepIconComponent={ColorlibStepIcon}
                                          >
                                            {label}
                                          </StepLabel>
                                        </Step>
                                      ))}
                                    </Stepper>
                                  </Stack>
                                </Box>
                              </Box>
                              {/*END OF TIMELINE*/}
                            </Box>
                          </Modal>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                ))}
              </Box>
            </TabPanel>
          </Grid>
        </Grid>
      </Box>

      <Footer />
    </Box>
  );
};

export default Profile;
