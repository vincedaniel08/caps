import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Modal,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SellerHeader from "../components/seller/SellerHeader";
import { useHistory } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  doc,
  getDoc,
  // query,
  // where,
  // collection,
  updateDoc,
} from "@firebase/firestore";
import { auth, db, storage } from "../utils/firebase";

const classes = {
  root: {
    backgroundColor: (theme) => theme.palette.background.default,
  },
  form: {
    margin: 1,
  },
  labelSelect: {
    outlineWidth: 200,
  },
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 520,
  bgcolor: "background.paper",
  border: "2px solid #50DC9A",
  boxShadow: 24,
  p: 3,
  overflow: "hidden",
  display: "block",
};

export default function Seller() {
 
  const ph = "Philippines";
  const [loading, setLoading] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [barangay, setBarangay] = React.useState("");
  const [houseNumber, setHouseNumber] = React.useState(0);
  const [munipality, setMunicipality] = React.useState("Candaba");
  const [province, setProvince] = React.useState("Pampanga");
  const date = new Date();
  const history = useHistory();
  const [userImg ,setUserImg] = useState(null);
  const [, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [ openAccountStatus, setOpenAccountStatus] = useState(false);
 
  const CHARACTER_LIMIT = 50;

  const HOUSE_LIMIT = 5;
  const types = ["image/png", "image/jpeg"]; // image types

  //add images
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

  const handleChangeName = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeHouse = (event) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value === "" || re.test(event.target.value)) {
      setHouseNumber(event.target.value);
    }
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



  const saveButton = async () => {

    if((userName === "" || houseNumber === 0)||(barangay === "" || userImg === null)){

      toast.error("All Field Required")
    }

    else{
    onAuthStateChanged(auth, (user) => {
    const storageRef = ref(storage,`seller-example-images/${date.toLocaleTimeString() + userImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef,  userImg, types);
  
     // const uploadTask = ref(storage, `product-images/${productImg.name}`).put(productImg);
      uploadTask.on('state_changed', snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setLoading(true)
        if (progress === 100){
          setLoading(false)
        }
        console.log(progress);
      }, err => setError(err.message)
        , () => {
          
        
        //  const UserDocRef = doc(collection(db, "Products"));
             var UserDocRef = doc(db, "Users",user.uid);
          getDownloadURL(uploadTask.snapshot.ref).then(url => {
            updateDoc( UserDocRef,{

            
              ProductExamplePic: date.toLocaleTimeString() + userImg.name,
              ShopName: userName,
              PickUpAddress: Number(houseNumber)+" "+ barangay+" "+ province +" "+ph,
              ProductExampleImg: url,
              UserType: "Buyer & Seller",
              BuyerStatus: "Pending",
              Timestamp: date.toLocaleDateString() +" "+ date.toLocaleTimeString(),
                
          }).then(() => {
           
            setUserName("");
            setHouseNumber("");
            setBarangay("");
         
             
              setError('');
              document.getElementById('file').value = '';
              toast.success(" Your Seller Account has been successfully setup. Wait to approve our admin")
              setTimeout(() => {
              
                history.push('/seller')
                
              }, 3000)
            }).catch(err => setError(err.message))
          })
        
        });
      })
    }
  }
  
  const buttonBack = async () => {
    history.push("/");
  };


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      const fetchData = async () => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);

          const docSnap = await getDoc(docRef);
          const docData = docSnap.data();
          // const q = doc(collectionRef , where("UserType", "==", "Buyer"));
          if (docData.UserType === "Buyer & Seller") {
            setOpen(false);
            // console.log("Document data:", docSnap.data());
            console.log("data exist:", docData);
            console.log("data exist:", docData.UserType);
          } if (docData.BuyerStatus === "Pending") {
            setOpenAccountStatus(true);

        } if (docData.UserType === "Buyer") {
            setOpen(true);
            console.log("not exist");
            console.log(user.email);

        } else{}
        } 
        
        else {
          history.push("/");
        }
      };

      fetchData();
    });
  }, [history]);


  return (
    <Box>
    
      <ToastContainer
      
     position="top-center"
    autoClose={3000}
      hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
      rtl={false}
        pauseOnFocusLoss
      draggable
        pauseOnHover
      />


      <SellerHeader />
      

      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="textPrimary"
          >
            Setting up your seller account!
          </Typography>

          <TextField
            multiline
            variant="filled"
            size="small"
            fullWidth
            label="Shop Name"
            inputProps={{
              maxLength: CHARACTER_LIMIT,
            }}
            value={userName}
            helperText={`${userName.length}/${CHARACTER_LIMIT}`}
            onChange={handleChangeName}
            margin="normal"
          />
          <Typography variant="captions" color="textPrimary" >Pick Up Address</Typography>

          <TextField
            sx={{ my: 1 }}
            size="small"
            multiline
            variant="filled"
            fullWidth
            label="House Number"
            inputProps={{
              maxLength: HOUSE_LIMIT,
            }}
            value={houseNumber}
            helperText={`${houseNumber.toString().length}/${HOUSE_LIMIT}`}
            onChange={handleChangeHouse}
          />

          <Box sx={{ minWidth: 300 }}>
            <FormControl fullWidth variant="filled" size="small">
              <InputLabel id="demo-simple-select-label">Barangay</InputLabel>
              <Select
                sx={classes.labelSelect}
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
            <div>
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
                  Select your example product
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
            </div>
          </Box>

          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={buttonBack}
            sx={{ mt: 2, backgroundColor: "#EE4B2B" }}
          >
            Back
          </LoadingButton>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={saveButton}
            sx={{ mt: 2, ml: 2 }}
          >
            Save
          </LoadingButton>
        </Box>
      </Modal>

      
      <Modal
        open={openAccountStatus}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            color="textPrimary"
          >
           Your Seller Account still checking....
          </Typography>
          <Button
            variant="contained"
            onClick={buttonBack}
            color="primary"
          > Back
            </Button>
          </Box>
          </Modal>
    </Box>
  );
}