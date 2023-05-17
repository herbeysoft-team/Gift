import { Avatar, Box, IconButton,Typography} from "@mui/material";
import React, { useRef, useState } from "react";
import Hero from "./Hero";
import Gift from "../../assets/gift.png";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CropEasy from "../Crop/CropEasy";

const EventPicture = () => {
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);


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


  return !openCrop ? (
  <Box sx={{ mx: 0.5, mb: 2, justifyContent: "center", alignItems: "center" }}>
    {/* header or hero section */}
    <Hero logo={Gift} title={"Add Gift/Event"} />
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
        
        <Avatar src={photoURL} alt="thumbnail" variant="square" onClick={onChooseImg} sx={{width:100, height:75}}/>
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
        Select Picture for the Event/Gift
      </Typography>
    </Box>
  </Box>
  ) : (
    <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile }} />
  );
};

export default EventPicture;
