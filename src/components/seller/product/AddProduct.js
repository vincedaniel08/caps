import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import DatePicker from "@mui/lab/DatePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { auth, db } from "../../../utils/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
 // updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useHistory } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Link,
  Typography,
  Grid,
  Paper,
  TextField,
  OutlinedInput,
  Switch,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import { styled } from "@mui/material/styles";
//import { useQuill } from "react-quilljs";
//import "quill/dist/quill.snow.css";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  //textAlign: "center",
  color: theme.palette.text.secondary,
  borderRadius: 10,
  width: "100%",
}));

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  height: 100,
  boxShadow: 24,
  p: 4,
};

export default function AddProduct() {
  const history = useHistory();
  const date = new Date();
  const storage = getStorage();
  const types = ["image/png", "image/jpeg"];
  const [, setError] = useState("");
 // const { quill, quillRef } = useQuill();
  const CHARACTER_LIMIT = 100;
  const DESCRIPTION_LIMIT = 1000;
  const [productCategory, setProductCategory] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productDesc, setProductDesc] = React.useState("");
  const [productQuantity, setProductQuantity] = React.useState(0);
  const [productWeight, setProductWeight] = React.useState(0);
  const [productShellLife, setProductShellLife] = React.useState("");
  const [productDate, setProductDate] = React.useState(new Date(""));
  const [productRegularPrice, setProductRegularPrice] = React.useState(0);
  const [productSalePrice, setProductSalePrice] = React.useState(0);
  const [productStock, setProductStock] = React.useState(true);
  const [progressUpload, setProgressUpload] = React.useState(false);

  const handleChangeStock = (event) => {
    setProductStock(event.target.checked);
    
  };

  const handleChangeName = (event) => {
    setProductName(event.target.value);
  };
  const handleChangeDesc = (event) => {
    setProductDesc(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setProductQuantity(event.target.value);
  };
  const handleChangeWeight = (event) => {
    setProductWeight(event.target.value);
  };
  const handleChangeShellLife = (event) => {
    setProductShellLife(event.target.value);
  };
  const handleChangeRegularPrice = (event) => {
    setProductRegularPrice(event.target.value);
  };
  const handleChangeSalePrice = (event) => {
    setProductSalePrice(event.target.value);
  };
  const handleChangeCategory = (event) => {
    setProductCategory(event.target.value);
  };

  // const onDrop = useCallback((acceptedFiles) => {
  //   // Do something with the files
  // }, []);

  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const remove = (file) => () => {
    console.log("removeFile...");
    getRootProps.onDrop.acceptedFiles.splice(
      getRootProps.onDrop.acceptedFiles.indexOf(file),
      1
    );
  };
  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} alt="hahah" />
        <DeleteIcon onClick={remove} />
      </div>
    </div>
  ));

  const addProduct = async () => {
    if (
      productName === "" ||
      productDesc === "" ||
      files.length === 0 ||
      productCategory === "" ||
      productQuantity === 0 ||
      productWeight === 0 ||
      productShellLife === "" ||
      productDate === new Date("") ||
      productRegularPrice === 0 ||
      productSalePrice === 0
    ) {
      toast.error("Required all field");
    } else {
      auth.onAuthStateChanged((user) => {
        files.forEach((file) => {
          const storageRef = ref(
            storage,
            `product-images/${date.toLocaleTimeString() + file.name}`
          );
          const uploadTask = uploadBytesResumable(storageRef, file, types);

          // const uploadTask = ref(storage, `product-images/${productImg.name}`).put(productImg);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              if (progress === 100) {
                toast.success("You have new product");
              }
              console.log(progress);
              setProgressUpload(true);
            },
            (err) => setError(err.message),
            () => {
              //  const UserDocRef = doc(collection(db, "Products"));
              var UserDocRef = collection(db, "Products");

              getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                addDoc(UserDocRef, {
                  SellerUid: user.uid,
                  ProductName: productName,
                  ProductCategory: productCategory,
                  ProductDesc: productDesc,
                  ProductStock: productStock,
                  ProductSalePrice: Number(productSalePrice),
                  ProductRegularPrice: Number(productRegularPrice),
                  ProductPicName: date.toLocaleTimeString() + file.name,
                  ProductImg: [url],
                  ProductQuantity: Number(productQuantity),
                  ProductShellLife: productShellLife,
                  ProductExpirationDate: productDate.toString(),
                  ProductWeight: productWeight,
                  CreatedDate: serverTimestamp(),
                })
                  .then(() => {
                    setProgressUpload(false);
                    setProductName("");
                    setProductCategory("");
                    setProductDesc("");
                    setProductSalePrice(0);
                    setProductRegularPrice(0);
                    setFiles([""]);
                    setProductQuantity(0);
                    setProductShellLife("");
                    setProductDate(new Date(""));
                    setProductWeight(0);
                    setError("");

                    setTimeout(() => {
                      history.push("/seller");
                    }, 10);
                  })
                  .catch((err) => setError(err.message));
              });
            }
          );
        });
      });
    }
  };

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <Box>
      <Modal sx={modalStyle} open={progressUpload}>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {" "}
          <CircularProgress />
        </Box>
      </Modal>

      <Breadcrumbs sx={{ mb: 1 }} separator="◦">
        <Link underline="hover" color="inherit" href="/seller">
          Home
        </Link>
        <Typography color="text.primary">New Product</Typography>
      </Breadcrumbs>
      <Box sx={{ my: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={9}>
            <Item>
              <TextField
                fullWidth
                label="Product Name"
                inputProps={{
                  maxLength: CHARACTER_LIMIT,
                }}
                value={productName}
                helperText={`${productName.length}/${CHARACTER_LIMIT}`}
                onChange={handleChangeName}
                margin="normal"
                variant="outlined"
              />
              <Typography variant="body2" sx={{ mb: 1, mt: 1 }}>
                Description
              </Typography>

              {/* <Box style={{ height: 200, mb: 2 }}>
                <Box ref={quillRef} />
              </Box> */}

              <OutlinedInput
                fullWidth
                placeholder="Write something to your product"
                rows={8}
                multiline
                value={productDesc}
                onChange={handleChangeDesc}
                inputProps={{
                  maxlength: DESCRIPTION_LIMIT,
                }}
              />

              <Typography variant="body2" sx={{ mt: 3, mb: 1 }}>
                Add Image
              </Typography>

              <Box sx={{ p: 2, border: "1px dashed grey" }}>
                <Box {...getRootProps({ className: "dropzone" })}>
                  <input {...getInputProps()} />
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileUploadOutlinedIcon
                      color="primary"
                      sx={{ fontSize: 50 }}
                    />
                    <Typography sx={{ ml: 2 }}>Drop or Select File</Typography>
                  </Box>
                </Box>
                <Box style={thumbsContainer}>{thumbs}</Box>
              </Box>
            </Item>
          </Grid>
          <Grid item xs={12} md={3}>
            <Item>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Switch
                  defaultChecked
                  size="small"
                  checked={productStock}
                  onChange={handleChangeStock}
                />
                <Typography variant="caption">In Stock</Typography>
              </Box>

              <FormControl fullWidth size="small" margin="normal">
                <InputLabel>Category</InputLabel>
                <Select
                  value={productCategory}
                  label="Cetegory"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value={"Fruits"}>Fruits</MenuItem>
                  <MenuItem value={"Cereal"}>Cereal</MenuItem>
                  <MenuItem value={"Milk"}>Milk</MenuItem>
                  <MenuItem value={"Egg"}>Egg</MenuItem>
                  <MenuItem value={"Fish"}>Fish</MenuItem>
                  <MenuItem value={"Meat"}>Meat</MenuItem>
                  <MenuItem value={"Fats and Oil"}>Fats and Oil</MenuItem>
                  <MenuItem value={"Sweets and sugars"}>
                    Sweets and sugars
                  </MenuItem>
                  <MenuItem value={"Spices and condiments"}>
                    Spices and condiments
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                size="small"
                label="Product Quantity"
                value={productQuantity}
                onChange={handleChangeQuantity}
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                size="small"
                label="Product Weight"
                value={productWeight}
                onChange={handleChangeWeight}
                margin="normal"
                variant="outlined"
              />
              <FormControl fullWidth margin="normal" size="small">
                <InputLabel>Shelf Life</InputLabel>
                <Select
                  value={productShellLife}
                  label="Shelf Life"
                  onChange={handleChangeShellLife}
                >
                  <MenuItem value={"1 Day"}>1 Day</MenuItem>
                  <MenuItem value={"2 Days"}> 2 Days</MenuItem>
                  <MenuItem value={"5 Days"}>5 Days</MenuItem>
                  <MenuItem value={"1 Week"}>1 Week</MenuItem>
                  <MenuItem value={"2 Weeks"}>2 Weeks</MenuItem>
                  <MenuItem value={"1 Months"}>1 Months</MenuItem>
                  <MenuItem value={"3 Months"}>3 Months</MenuItem>
                  <MenuItem value={"7 Months"}>7 Months</MenuItem>
                  <MenuItem value={"1 Years"}>1 Year</MenuItem>
                  <MenuItem value={"2 Years"}>2 Years</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ my: 2 }}>
                <LocalizationProvider dateAdapter={DateAdapter}>
                  <DatePicker
                    format="MM/dd/yyy"
                    label="Expiration Date"
                    value={productDate}
                    onChange={(newValue) => {
                      setProductDate(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Item>
            <Item sx={{ my: 2 }}>
              <TextField
                fullWidth
                size="small"
                label="Regular Price"
                value={productRegularPrice}
                onChange={handleChangeRegularPrice}
                margin="normal"
                variant="outlined"
              />

              <TextField
                fullWidth
                size="small"
                label="Sale Price"
                value={productSalePrice}
                onChange={handleChangeSalePrice}
                margin="normal"
                variant="outlined"
              />
            </Item>
            <Button fullWidth variant="contained" onClick={addProduct}>
              Create Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
