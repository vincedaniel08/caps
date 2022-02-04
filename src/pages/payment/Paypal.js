import React, { useRef, useEffect, useState } from "react";

//import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

//backend 
import {
    where,
    collection,
    query,
    onSnapshot,
    documentId,
    Timestamp,
    deleteDoc,
    addDoc,
    doc,
  } from "firebase/firestore";
  import { db, auth } from "../../utils/firebase";
export default function Paypal( { Message}) {
//   const history = useHistory();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([{ id: "initial" }]);
  const paypal = useRef();



  useEffect(() => {
      
   
    const id = user.cart.map((carts) => carts.ProductId);
    const qty = user.cart.map((carts) => carts.CartQty);
    console.log("Cart", id);
    const collectionRefCart = collection(db, "Products");
    const qCart = query(collectionRefCart, where(documentId(), "in", id));
    onSnapshot(qCart, (snapshot) =>
      setProducts(
        snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
          Cart: qty,
        }))
      )
    );
  }, [user]);
  
  useEffect(() => {

    

    
        window.paypal
          .Buttons({
            createOrder: (data, actions, err) => {
              var price = Math.floor((30 + 30) / 48.68);
              return actions.order.create({
                intent: "CAPTURE",
                purchase_units: [
                  {
                    description: "Agrishop",
                    amount: {
                      currency_code: "USD",
                      value: price,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              console.log("Paypal");

              var years = new Date().getFullYear();
              var months = new Date().getMonth();
              var text = "" + months + years;

              for (let i = 0; i < 10; i++) {
                var possible =
                  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                text += possible.charAt(
                  Math.floor(Math.random() * possible.length)
                );
              }
              auth.onAuthStateChanged(async (users) => {
                const username = user.myuserdata.map((data) => data.UserName);
                const address = user.myuserdata.map((data) => data.UserAddress);
                const contact = user.myuserdata.map(
                  (data) => data.ContactNumber
                );

                products.map(
                  async (product, key) =>
                    await addDoc(collection(db, "Orders"), {
                      OrderId: "Agrishop" + text,
                      ProductId: product.id,
                      ProductImage: product.ProductImg,
                      ProductName: product.ProductName,
                      ProductPrice: product.ProductSalePrice,
                      SellerUid: product.SellerUid,
                     ProductQty: user.cart.map((carts) => carts.CartQty)[key],
                      BuyerUid: users.uid,
                      BuyerMessage: Message,
                      BuyerName: username[0],
                      BuyerAddress: address[0],
                      BuyerContactNumber: contact[0],
                      OrderStatus: "To Pay",
                      SellerAccept: false,
                      RiderAccept: false,
                      BuyerAccept: false,
                      RiderUid: "",
                      RiderStatus: false,
                      SubTotal: Number(
                        user.cart.map((carts) => carts.CartQty)[key] *
                          product.ProductSalePrice
                      ),
                      DeliveryFee: Number(
                        60 + 10 * user.cart.map((carts) => carts.CartQty)[key]
                      ),
                      Total: Number(
                        user.cart.map((carts) => carts.CartQty)[key] *
                          product.ProductSalePrice +
                          60 +
                          10 * user.cart.map((carts) => carts.CartQty)[key]
                      ),
                      Payment: "Paypal",
                      CreatedAt: Timestamp.fromDate(new Date()),
                    })
                );
              });

              user.cart.map(
                async (cart) => await deleteDoc(doc(db, "Cart", cart.id))
              );
            },
            onError: (err) => {
              console.log(err);
            },
          })
          .render(paypal.current)
     
  });

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
