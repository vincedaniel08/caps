import React,{useState,useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/system'
//import { makeStyles } from '@mui/styles';
import { Typography } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

//backend
import { collection,onSnapshot,query,where} from '@firebase/firestore';
import {db} from "../../../utils/firebase";


import { useSelector } from "react-redux";
import dayjs from "dayjs";
import localizeFormat from "dayjs/plugin/localizedFormat";
import { documentId } from 'firebase/firestore';
dayjs.extend(localizeFormat);


// const useStyles = makeStyles({
//     root: {
//       '& .super-app-theme--header': {
//         backgroundColor: '#438734'
//       },
//     },
//   });
  
export default function FinanceDashboard() {
    const userData = useSelector((state) => state.user);

    const [balance, setBalance]  = useState([{Balance:0}]);
    const [transac, setTransac]  = useState([]);
   
     const columns =[
         {
             field: "Cash",
             headerName: "Cash",
             headerClassName: 'super-app-theme--header',
             width: 130,
     
         },
         {
             field: "OrderId",
             headerName: "Order Id",
             headerClassName: 'super-app-theme--header',
             width: 200,
    
         },
         {
             field: "CreatedDate",
             headerName: "Date Created",
             headerClassName: 'super-app-theme--header',
             width: 200,
            //  renderCell: (params) => (
            //     <Typography>{dayjs(params.value).format("LLL")}</Typography> )
   
             
          
         },
     ];
     useEffect(() => {
        const id = userData.myuserdata.map((myuser) => myuser.id);
        const collectionRef = collection(db, "Bank");
        const q = query(collectionRef, where(documentId(), "in", id) );
        onSnapshot(q, (snapshot) =>
        setBalance(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );  

   
        const collectionRefTransac = collection(db, "Transactions");
        const qtransac = query(collectionRefTransac, where("SellerUid", "==", userData.myuserdata.map((myuser) => myuser.id)[0]) );
        onSnapshot(qtransac, (snapshot) =>
        setTransac(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        );  
        
      
    },[userData]);
  return (
      <Box>
          <Box sx={{display:"block", justifyContent:"center", flexDirection:"row", textAlign:"center",my:2}}>
          <AccountBalanceWalletIcon sx={{fontSize:200}}/>
          <Typography>Balance: <b>{balance.map((balance) => balance.Balance)}.00</b></Typography>
          </Box>

          <DataGrid 
                  columns={columns} 
                  rows={transac} 
                 // pageSize={10} 
                  autoHeight
                  autoWitdh
                  disableSelectionOnClick
                  disableMultipleSelection
                  />
      </Box>
  );
}
