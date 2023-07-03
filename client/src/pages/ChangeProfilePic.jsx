import { Avatar, Box, Button, styled } from '@mui/material'
import React, { useRef, useState } from 'react'
import MobileNavBar from '../components/MobileNavBar'
import ProfilePic from "../assets/profile.png";
//import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  uploadProfilePic,
} from "../context/features/userSlice";
import toast from "react-hot-toast";
import { deepPurple } from "@mui/material/colors";
import CropEasy from '../components/Crop/CropEasy';
import URLBASE from '../constant/urlbase';


const CustomButton = styled(Button)(({ theme }) => ({
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    paddingRight: 20,
    paddingLeft: 20,
    paddingY: 2,
    fontSize: 12,
    fontFamily: "Poppins",
    justifyContent: "center",
    borderRadius: 20,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  }));

const ChangeProfilePic = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => ({ ...state.user }));
  const inputRef = useRef();
  const [file, setFile] = useState(null);
  const [openCrop, setOpenCrop] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);

  const onSubmitUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    if(file){
      dispatch(uploadProfilePic({formData, toast}))
    }
    }

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

  return  (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
      <MobileNavBar logo={ProfilePic} title={"Update Profile"} />
      {/* Profile Section */}
      {!openCrop ?
      <Box
        p={2}
        sx={{
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          my: 10,
        }}
      >
        {!file ?
        <Avatar
          onClick={onChooseImg} 
          alt="PP"
          src={`${URLBASE.imageBaseUrl}${userProfile?.profilePic}`}
          sx={{ bgcolor: deepPurple[500], width: 128, height: 128 }}
        />
            :
          <Avatar
          onClick={onChooseImg} 
          alt="PP"
          src={photoURL}
          sx={{ bgcolor: deepPurple[500], width: 128, height: 128 }}
        />
        }

        <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: "none" }}
      />
        
        <CustomButton onClick={onSubmitUpdate}>Update Profile Picture</CustomButton>
      </Box> :
      <CropEasy {...{ photoURL, setOpenCrop, setPhotoURL, setFile, aspectRatio: 1}} />
    }
    </Box>
  )
}

export default ChangeProfilePic
