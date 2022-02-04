import React, { useState} from "react";
import {
  Box,
  Paper,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Divider,
  AppBar,
  Toolbar,
  Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import style from "../styles/register";
import LoadingButton from "@mui/lab/LoadingButton";
import Footer from "../components/Footer";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

import { auth } from "../utils/firebase";
import { useHistory } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {  sendEmailVerification } from "firebase/auth";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";




export default function Register() {

 
  const provider = new GoogleAuthProvider();
  const history = useHistory();
  const [buttonLoading,setButtonLoading] = React.useState(false);
  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword:"",
    showConfirmPassword: false,
    showPassword: false,
  });

  
  
 

  function handleClick() {
    setButtonLoading(true);
  }
 

  const handleChange = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };
 
  const handleClickShowPassword = (e) => {
    setPayload({ ...payload, showPassword: !payload.showPassword });
  };
  const handleClickShowConfirmPassword = (e) => {
    setPayload({ ...payload, showConfirmPassword: !payload.showConfirmPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };
  const handleMouseDownConfirmPassword = (e) => {
    e.preventDefault();
  };

  const buttonLogin = () => {
    history.push("/login");
  }

  const buttonShop = () => {
    history.push('/shop');
  };
  const buttonHome = () => {
    history.push("/");
  };

  function buttonGoogle() {
    
    setButtonLoading(true);

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
       // const token = credential.accessToken;
        // The signed-in user info.
        //const user = result.user;
        // ...
        setButtonLoading(false);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        alert(errorCode, errorMessage,email);
        
     //   const credential = GoogleAuthProvider.credentialFromError(error);
     setButtonLoading(false);
        // ...
      });
  }
  const buttonSignup =  async () => {
  
    setButtonLoading(true);

    if(payload.password !== payload.confirmPassword){
      alert("Password and Confirm Password does not match");
      setButtonLoading(false);
    }
    else {

      createUserWithEmailAndPassword(auth, payload.email, payload.password)
      .then((userCredential) => {
        // Signed in
        // ...
      
        const auth = getAuth();
        sendEmailVerification(auth.currentUser)
          .then(() => {
            // Email verification sent!
            alert("Email sent");
            auth.signOut();
            setButtonLoading(false);
            history.push("/")
            // ...
          });
       
        
       
      })
      .catch((error) => {
        // error

        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode,errorMessage)
        setButtonLoading(false);
      });
  }
 }

 

  return (
    <Box sx={style.root}>
       <AppBar position="static" sx={style.appbar}>
        <Toolbar sx={{ background: "white", boxShadow: 1 }}>

          <Button onClick={buttonShop} >
           Shop
          </Button>

          <Typography
            variant="h6"
            component="div"
            color="primary"
            sx={{ flexGrow: 0.5 }}
          />

          <Box sx={style.logo} onClick={buttonHome} />
          <Button color="primary" variant="outlined"  >
            Download this App
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={style.boxOne} >
      <Box sx={style.boxImage}>
      </Box>
      <Paper sx={style.paperOne}>
      <Typography color="textPrimary" >Sign Up</Typography>
        <TextField
          label="Email"
          variant="outlined"
          sx={style.textField}
          
          fullWidth
          onChange={handleChange("email")}
          value={payload.email}
        />

        <FormControl sx={style.textField} variant="outlined" fullWidth> 
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="password"
            type={payload.showPassword ? "text" : "password"}
            value={payload.password}
            onChange={handleChange("password")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {payload.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            label="Password"
          />
        </FormControl>

        
        <FormControl sx={style.textField} variant="outlined" fullWidth  > 
          <InputLabel htmlFor="outlined-adornment-confirmPassword">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="confirmPassword"
            type={payload.showConfirmPassword ? "text" : "password"}
            value={payload.confirmPassword}
           
            onChange={handleChange("confirmPassword")}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle confirmPassword visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                  edge="end"
                >
                  {payload.showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            color="primary"
            label="Confirm Password"
          />
        </FormControl>

       

        <LoadingButton
            fullWidth
            sx={style.button}
            variant="contained"
            onClick={buttonSignup}
             size="large"
            loading={buttonLoading}
          >
           <Typography color="textPrimary"> Signup</Typography>
          </LoadingButton>
            
         
          <Typography color="textPrimary">   <Divider  sx={{mt:3}}/></Typography>
       
          <Box sx={style.boxLoadingButton}>
          <LoadingButton
           fullWidth
         sx={{backgroundColor:"#DE4A3E", m:1}}
        color="secondary"
        onClick={buttonGoogle}
        loading={buttonLoading}
        loadingPosition="start"
        startIcon={<GoogleIcon />}
        variant="contained"
      >  <Typography sx={{fontSize:9}}>  
        Sign in with Google+
        </Typography>
      </LoadingButton>

      <LoadingButton
        fullWidth
        sx={{backgroundColor:"#37508A",  m:1}}
        color="secondary"
        onClick={handleClick}
        loading={buttonLoading}
        loadingPosition="start"
        startIcon={<FacebookIcon sx={{color:"white"}}/>}
        variant="contained"
      >   <Typography sx={{fontSize:9}}>  
        Sign in with Facebook
        </Typography>
      </LoadingButton>
          </Box>
       
       <Box sx={{ m:2,textAlign:"center" }}>
          <Typography color="textPrimary" sx={{fontSize:10,}}>By signing up, you agree to Agrishop's</Typography>
          <Typography color="textPrimary" sx={{fontSize:10, }}>Terms of Services and</Typography>
          <Typography color="textPrimary" sx={{fontSize:10,}}>Privacy Policy</Typography>
          </Box>
         
          <Box sx={{textAlign:"center", display:"flex" ,justifyContent: "center",}}>
          <Typography color="textPrimary" sx={{fontSize:12}}>Have an account?</Typography>
          <Typography color="textPrimary" sx={style.signUpTypography} onClick={buttonLogin}>Log In</Typography>
          </Box>
          
      </Paper>
      
      </Box>
      <Box sx={{width:"100%", height:40,  backgroundColor: (theme) => theme.palette.primary.main,}}/>
      <Box sx={{height:"20px"}}/>
      <Footer />
    </Box>
  );
}
