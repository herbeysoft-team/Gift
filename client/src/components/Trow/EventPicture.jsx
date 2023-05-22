import { Avatar, Box, Button, CardMedia, Divider, IconButton, Typography } from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import Hero from "./Hero";
import Gift from "../../assets/gift.png";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CropEasy from "../Crop/CropEasy";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createTrow } from "../../context/features/trowSlice";



const initialState={
  category_name:"",
  event_date:"",
  event_name:"",
  event_purpose:"",
  phone_no:"",
  recommended_gift:[],
  username:null

}

const EventPicture = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [formVale, setFormValue] = useState(initialState)
  const {category_name, event_date, event_name, event_purpose, phone_no, recommended_gift, username} = formVale

  useEffect(() => {
    // Check if trowDetails already exists in local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      const trowDetails = JSON.parse(trowDetailsString);
      setFormValue(trowDetails);
    }
  }, []);

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

  const onChooseImg = () => {
    inputRef.current.click();

  };

  const handleSubmitTrow = async (e) => {
    e.preventDefault();
   
    if(!file){
      toast.error("Please upload event image")
    }
    if(!(username || phone_no)){
      toast.error("Please enter username or phone no of recipient")
    }
    if((event_name && event_purpose && category_name && event_date )){
      
      console.log({event_name, username, phone_no,event_purpose, category_name, recommended_gift})
      const formData = new FormData();
      formData.append('file', file);
      formData.append('username', username.phone_no);
      formData.append('phone_number', phone_no);
      formData.append('event_name', event_name);
      formData.append('event_purpose', event_purpose);
      formData.append('category_name', category_name);
      formData.append('recommended_gift', recommended_gift);
      dispatch(createTrow({formData, navigate, toast}))
      
    }else{
      toast.error("Please fill in the neccesary details")
    }
      

   
    //dispatch(createItem({formData, navigate, toast}))
    
    }

  return !openCrop ? (
    <Box
      sx={{ mx: 0.5, mb: 2, justifyContent: "center", alignItems: "center" }}
    >
      {/* header or hero section */}
      <Hero logo={Gift} title={"Trow Review"} />
      {/* the form  */}
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
        {!file ? (
          <IconButton
            aria-label="insert"
            size="large"
            color="primary"
            onClick={onChooseImg}
          >
            <InsertPhotoOutlinedIcon sx={{ width: 100, height: 100 }} />
          </IconButton>
        ) : (
          <Avatar
            src={photoURL}
            alt="thumbnail"
            variant="square"
            onClick={onChooseImg}
            sx={{ width: 100, height: 75 }}
          />
        )}

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
          Select Picture for the Event/Gift
        </Typography>
      </Box>
      
      {/* The trow review */}
      <Box
        sx={{
          position: "relative",
          my: 4,
          mx: 2,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <CardMedia
          component="img"
          fit="cover"
          image={photoURL}
          alt="Paella dish"
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            right: 0,
            left: 0,
            display: "flex",
            flexDirection: "row",
            gap: 1,
            backgroundColor: "white",
            opacity: 0.6,
            px: 1,
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", flex: 3 }}>
            <Typography
              variant="h5"
              color="primary"
              fontFamily="Poppins"
              fontWeight="medium"
            >
              Hello
            </Typography>
            <Divider />
            <Typography variant="body" color="primary" fontFamily="Poppins">
              Hello
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Trow Button */}
      <Box display="flex" alignContent="center" justifyContent="center">
      <Button variant="contained" endIcon={<ArrowRightAltIcon />} onClick={handleSubmitTrow}>
        Trow It !!!
    </Button>
    </Box>
    </Box>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
};

export default EventPicture;
