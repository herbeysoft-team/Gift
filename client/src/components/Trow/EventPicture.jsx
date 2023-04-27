import { Box, IconButton, Typography } from "@mui/material";
import React, { useRef } from "react";
import Hero from "./Hero";
import Gift from "../../assets/gift.png";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

const EventPicture = () => {
  const inputRef = useRef();

  const handleOnChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      //   reader.onload = function (e) {
      //     onImageSelected(reader.result);
      //   };
    }
  };

  const onChooseImg = () => {
    inputRef.current.click();
  };
  return (
    <Box
      sx={{ mx: 0.5, mb: 2, justifyContent: "center", alignItems: "center" }}
    >
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
        <IconButton
          aria-label="insert"
          size="large"
          color="primary"
          onClick={onChooseImg}
        >
          <InsertPhotoOutlinedIcon sx={{ width: 100, height: 100 }} />
        </IconButton>
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
  );
};

export default EventPicture;
