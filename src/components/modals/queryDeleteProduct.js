import React from "react";
import { Box, Button, Modal, TextField } from '@mui/material'
import {

    query,
    doc,
    where,
    getDocs,
    deleteDoc,
    collection,
    //serverTimestamp,
  } from "firebase/firestore";

  //import { ref,deleteObject } from "@firebase/storage";
  import {db} from "../../utils/firebase";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function QueryDeleteProduct({open,setOpen,product}) {

    const [productName, setProductName] = React.useState("");
    const CHARACTER_LIMIT = 100;
    const handleClose = () => setOpen(false);
    const handleChangeName = (event) => {
        setProductName(event.target.value);
      };

      const deleteButton = async () =>{
       // const storageRef = ref(storage,`product-images/${product.ProductPicName}`);
        const collectionRef = collection(db, "Products");
        const q = query(collectionRef, where("ProductName", "==", productName));
        const snapshot = await getDocs(q);
      
        const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        console.log(q)
        console.log(snapshot)
        console.log(results)
        
      if(results.length === 0){
        alert("No Product Name Found")
    
        }else{
        results.forEach(async (result) => {
            const docRef = doc(db, "Products", result.id);
          //  await deleteObject(storageRef);
            await deleteDoc(docRef).then(() => {
          
              setProductName('');
            }).catch()
          
            handleClose();
          
        })
    }
    }
    

    return (
        <Box>
     <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
         <Box sx={style}>
             <TextField  label="Product Name" variant="filled" fullWidth sx={{mt:2,}}
           inputProps={{
            maxlength: CHARACTER_LIMIT,
          }}
          value={productName}
        
          helperText={`${productName.length}/${CHARACTER_LIMIT}`}
          onChange={handleChangeName}
          />

            <Button variant="contained"  onClick={handleClose} sx={{mt:2,backgroundColor:"#EE4B2B"}}>Cancel</Button>
          <Button variant="contained"  onClick={deleteButton} sx={{mt:2,ml:2}}>Delete</Button>
          </Box>
      </Modal>
        </Box>
    )
}
