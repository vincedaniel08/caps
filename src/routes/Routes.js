import React,{useEffect, useState} from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import theme from '../utils/theme';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import PublicRoute from "./publicRoute";
import PrivateRoute from "./privateRoute";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import ProductDetail from "../pages/ProductDetail";
import ShopPage from "../pages/ShopPage";
import NotFound from "../pages/NotFound"
import Loading from "../components/Loading";
import Login from "../pages/Login";
import Register from "../pages/Register";
import HomeNoUser from "../pages/HomeNoUser";
import Cart from "../pages/Cart";
import Chat from "../pages/chat/pages/Chat"
import Checkout from "../pages/Checkout";
import Seller from "../pages/Seller"
import Profile from "../pages/Profile"

//backend
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { auth,db } from "../utils/firebase";
import { getTheme, getLang, } from "../redux/actions/uiAction";
import { setCart, setProduct, setUser, setChatUser, setCheckout,setMyUserData,setOrders,sethOrderHistory} from "../redux/actions/userAction";
import {  where,collection,query,onSnapshot,orderBy } from "firebase/firestore";
import Forgot from "../pages/Forgot";

export default function Routes() {
    const dispatch = useDispatch();
    const ui = useSelector(state => state.ui)
   // const userData = useSelector(state => state.user)
    const THEME = createTheme(theme(ui.isDarkMode));
    const [state, setstate] = useState({
        isAuth: false,
        isLoading: true,
      });

      useEffect(() => {
        console.log("gago")
        onAuthStateChanged(auth, (user) => {
         // console.log(user.uid);
            
            const collectionRefProducts = collection(db, "Products");
            const qProducts = query( collectionRefProducts, orderBy("CreatedDate"));
            onSnapshot(qProducts, (snapshot) =>
              dispatch(setProduct(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );

            const collectionRefUsers = collection(db, "Users");
            const qUsers = query( collectionRefUsers, orderBy("UserName"));
            onSnapshot(qUsers, (snapshot) =>
              dispatch(setUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );
            
   
            const collectionRef1 = collection(db, "UserChat");
            const q1 = query(collectionRef1, orderBy("name"));
           onSnapshot(q1, (snapshot) =>
           dispatch(setChatUser(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );
            
          if (user && user.emailVerified) {
            // ...
            console.log(auth);
            setstate({ isAuth: true, isLoading: false });
    
            
            const collectionRef = collection(db, "Cart");
            const q = query(collectionRef, where("BuyerUid", "==", user.uid));
           onSnapshot(q, (snapshot) =>
           dispatch(setCart(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );

            const collectionRefCheckout = collection(db, "Checkout");
            const qCheckout = query(collectionRefCheckout, where("BuyerUid", "==", user.uid));
           onSnapshot(qCheckout, (snapshot) =>
           dispatch(setCheckout(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );

            const collectionRefMyData = collection(db, "Users");
            const qMyData = query(collectionRefMyData , where("UserUid", "==", user.uid));
           onSnapshot(qMyData , (snapshot) =>
           dispatch(setMyUserData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );

            const collectionRefOrders = collection(db, "Orders");
            const qOrders = query(collectionRefOrders , where("SellerUid", '==', user.uid),where("SellerAccept", "==", false));
           onSnapshot(qOrders , (snapshot) =>
           dispatch(setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );
            const collectionRefOrderHistory = collection(db, "Orders");
            const qOrderHistory = query(collectionRefOrderHistory , where("SellerUid", '==', user.uid),where("SellerAccept", "==", true));
           onSnapshot(qOrderHistory , (snapshot) =>
           dispatch(sethOrderHistory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) )
            );
    
          } else {
            setstate({ isAuth: false, isLoading: false });
            
          }
        });

        dispatch(getLang(), getTheme());
        
      }, [dispatch]);
    
    
    
    
      if (state.isLoading) {
        return <Loading />;
      }

    return (
        <ThemeProvider theme={THEME}>
        <Router>
            <Switch>
    
                <Route path="/" exact>
            <Redirect to="/homenouser" />
          </Route>

          <PrivateRoute
            component={Home} 
            isAuth={state.isAuth}
            path="/home"
            exact
          />
           <PrivateRoute
            component={Cart} 
            isAuth={state.isAuth}
            path="/cart"
            exact
          />
          <PrivateRoute
            component={Chat} 
            isAuth={state.isAuth}
            path="/chat"
            exact
          />
           <PrivateRoute
            component={Checkout} 
            isAuth={state.isAuth}
            path="/checkout"
            exact
          />
           <PrivateRoute
            component={Seller} 
            isAuth={state.isAuth}
            path="/seller"
            exact
          />
          <PrivateRoute
            component={Profile} 
            isAuth={state.isAuth}
            path="/profile"
            exact
          />
          <PublicRoute
            restricted={true}
            component={HomeNoUser}
            isAuth={state.isAuth}
            path="/homenouser"
            exact
          />
            <PublicRoute
            restricted={true}
            component={Login}
            isAuth={state.isAuth}
            path="/login"
            exact
          />
            <PublicRoute
            restricted={true}
            component={Register}
            isAuth={state.isAuth}
            path="/register"
            exact
          />
          <PublicRoute
       
            component={Shop}
            isAuth={state.isAuth}
            path="/shop"
            exact
          />
           <PublicRoute
      
            component={ProductDetail}
            isAuth={state.isAuth}
            path="/productdetail"
            exact
          />
             <PublicRoute
        
            component={ShopPage}
            isAuth={state.isAuth}
            path="/shoppage"
            exact
          />
            <PublicRoute
            restricted={true}
            component={Forgot}
            isAuth={state.isAuth}
            path="/forgot"
            exact
          />
         
          <Route component={NotFound} />
            </Switch>

        </Router>
        </ThemeProvider>

    );
}