import { Avatar, Box, Button, IconButton, MenuItem, TextField, Typography, styled } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import MobileNavBar from "../components/MobileNavBar";
import Store from "../assets/store.png";
import { getSubcategories, createItem } from "../context/features/itemSlice";
import { useDispatch, useSelector } from "react-redux";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CropEasy from "../components/Crop/CropEasy";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CustomButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    width:"100%",
    backgroundColor: theme.palette.primary.main,
    paddingRight: 20,
    paddingLeft: 20,
    paddingY: 2,
    fontSize: 14,
    fontFamily: "Poppins",
    justifyContent: "center",
    borderRadius: 20,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  }));


const AddItem = () => {
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemCategory, setItemCategory] = useState("");
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const { item_subcategories } = useSelector((state) => ({ ...state.item }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSubcategories());
  }, [dispatch]);

  const handleOnChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file) {
        setFile(file);
        setPhotoURL(URL.createObjectURL(file));
        setOpenCrop(true);
      }
    }
  };

  const onSubmitItem= async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if(file && itemCategory && itemDescription && itemName){
    formData.append('file', file);
    formData.append('name', itemName);
    formData.append('description', itemDescription);
    formData.append('category', itemCategory);
        dispatch(createItem({formData, navigate, toast}))
    }else{
        toast.error("Please fill in all required field")
    }
    }

  const onChooseImg = () => {
    inputRef.current.click();
  };


  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      {/* header */}
      <MobileNavBar logo={Store} title={"Add Item"} />
      {/* the form  */}
      {!openCrop ?
      <Box
        component="form"
        noValidate
        sx={{
          my: 2,
          marginX: { xs: "0.5rem", md: "0.5rem", lg: "3rem" },
          p: 3,
        }}
      >
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Item Name
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          size="normal"
          id="itemName"
          label="Item Name"
          name="itemName"
          value={itemName|| ""}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Item Description
        </Typography>
        <TextField
          margin="normal"
          size="normal"
          fullWidth
          name="itemDescription"
          label="Item Description"
          type="text"
          id="itemDescription"
          value={itemDescription|| ""}
          onChange={(e) => setItemDescription(e.target.value)}
        />
        <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Item Category
        </Typography>
        {item_subcategories.length > 0 &&
        <TextField
          margin="normal"
          size="normal"
          fullWidth
          select
          name="itemCategory"
          label="Item Category"
          type="text"
          id="itemCategory"
          value={itemCategory || ""}
          onChange={(e) => setItemCategory(e.target.value)}
        >
          <MenuItem value="" disabled>Choose Category</MenuItem>
          {item_subcategories.map((item, index) => (
                <MenuItem value={item.id} key={index + 200}>
                  {item.sub_cat_name}
                </MenuItem>
              ))}
        </TextField>
        }
         <Typography
          variant="body"
          color={"primary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Item Image
        </Typography>
        <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        my: 1,
        marginX: { xs: "0.5rem", md: "0.5rem", lg: "3rem" },
        p: 3,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
        {!file ?
      <IconButton
        aria-label="insert"
        size="large"
        color="primary"
        onClick={onChooseImg}
      >
        <InsertPhotoOutlinedIcon sx={{ width: 100, height: 100 }} />
      </IconButton>
      : (
        
        <Avatar src={photoURL} alt="thumbnail" variant="square" onClick={onChooseImg} sx={{width:100, height:180}}/>
      )
      }

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
      <Typography
        variant="body"
        color={"primary"}
        sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
      >
        Choose Item Picture
      </Typography>
      </Box>
      <CustomButton onClick={onSubmitItem}>Add Item</CustomButton>
      </Box>
      :
      <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile, aspectRatio: 3/4}} />
    }
    </Box>
  );
};

export default AddItem;
