import React, { useState } from "react";
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
import style from "../styles/login";
import LoadingButton from "@mui/lab/LoadingButton";
import Footer from "../components/Footer";
import { useHistory } from "react-router-dom";
//icon
import GoogleIcon from "@mui/icons-material/Google";

import { signInWithEmailAndPassword } from "firebase/auth";
import FacebookIcon from "@mui/icons-material/Facebook";
import { updateDoc, doc } from "firebase/firestore";
import { auth,db } from "../utils/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useSelector } from "react-redux";

export default function Login() {
  const userData = useSelector((state) => state.user);
  const history = useHistory();
  const provider = new GoogleAuthProvider();

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const [loading, setLoading] = React.useState(false);
  const forgotPassword = () => {
    history.push('/forgot');
  }
  const buttonShop = () => {
    history.push('/shop');
  };
  const buttonHome = () => {
    history.push("/");
  };

  function buttonGoogle() {
    setLoading(true);

    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        //const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        //const user = result.user;
        // ...
        setLoading(false);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        alert(errorCode, errorMessage, email);

        //   const credential = GoogleAuthProvider.credentialFromError(error);
        setLoading(false);
        // ...
      });
  }

  function buttonFacebook() {
    // setLoading(true);
  }
  const buttonSignup = () => {
    history.push("/register");
  };

  const handleChange = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };

  const handleClickShowPassword = (e) => {
    setPayload({ ...payload, showPassword: !payload.showPassword });
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  const buttonLogin = async () => {
    setLoading(true);

    signInWithEmailAndPassword(auth, payload.email, payload.password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        const emailVerified = user.emailVerified;
        if (emailVerified === true) {
          //history.push("/login");
     
        
          if(userData.chatUser.filter((chat) => (chat.uid === user.uid)).length === 0 ){
            console.log("undefindedddd")
            setLoading(false);
          } else {
            await updateDoc(doc(db, "UserChat", userData.chatUser.find((chat) => (chat.uid === user.uid)).id), {
              isOnline: true,
            });
            console.log("findedddd")
          }

          
          
        } else {
          auth.signOut();
          alert("Your Email is not verified");
          setLoading(false);
        }
        // ...
      })
      .catch((error) => {
        // error code
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
        setLoading(false);
      });
  };
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

      <Box sx={style.boxOne}>
        <Box sx={style.boxImage}></Box>
        <Paper sx={style.paperOne}>
          <Typography color="textPrimary">Log In</Typography>
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

          <LoadingButton
            fullWidth
            sx={style.button}
            variant="contained"
            onClick={buttonLogin}
            size="large"
            loading={loading}
          >
            <Typography color="textPrimary"> Login</Typography>
          </LoadingButton>
          <Typography
            color="textPrimary"
            sx={{ fontSize: 12, mt: 2, textAlign: "right" }}
          >
            Contact Us
            <Typography
              color="textPrimary"
              sx={{ fontSize: 12, textAlign: "left", mt: -2 }}
              onClick={forgotPassword}
            >
              Forgot Password
            </Typography>
          </Typography>

          <Typography color="textPrimary">
            {" "}
            <Divider sx={{ mt: 2 }} />
          </Typography>

          <Box sx={style.boxLoadingButton}>
            <LoadingButton
              fullWidth
              sx={{ backgroundColor: "#DE4A3E", m: 1 }}
              color="secondary"
              onClick={buttonGoogle}
              loading={loading}
              loadingPosition="start"
              startIcon={<GoogleIcon />}
              variant="contained"
            >
              {" "}
              <Typography sx={{ fontSize: 9 }}>Sign in with Google+</Typography>
            </LoadingButton>

            <LoadingButton
              fullWidth
              sx={{ backgroundColor: "#37508A", m: 1 }}
              color="secondary"
              onClick={buttonFacebook}
              loading={loading}
              loadingPosition="start"
              startIcon={<FacebookIcon sx={{ color: "white" }} />}
              variant="contained"
            >
              {" "}
              <Typography sx={{ fontSize: 9 }}>
                Sign in with Facebook
              </Typography>
            </LoadingButton>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              mt: 1,
            }}
          >
            <Typography color="textPrimary" sx={{ fontSize: 12 }}>
              New to Agrishop?
            </Typography>
            <Typography
              color="textPrimary"
              sx={style.signUpTypography}
              onClick={buttonSignup}
            >
              Sign Up
            </Typography>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: 110,
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      />
      <Box sx={{height:"20px"}}/>
      <Footer />
    </Box>
  );
}
