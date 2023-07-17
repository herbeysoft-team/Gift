import { Box, CardMedia, Divider, Typography } from '@mui/material'
import React, {useEffect} from 'react'
import MobileNavBar from '../components/MobileNavBar'
import Store from "../assets/store.png";
import { useLocation, useNavigate} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getItem } from "../context/features/itemSlice";
import URLBASE from "../constant/urlbase";

const Item = () => {
const dispatch = useDispatch();
const { item } = useSelector((state) => ({ ...state.item }));

const id = useLocation().pathname.split("/")[3];

  useEffect(() => {
    if (id) {
      dispatch(getItem(id));
    }
  }, [id, dispatch]);


  return (
    <Box mt={{sm:"none", xs:"none", md:7, lg:7}}>
    <MobileNavBar logo={Store} title={"Item"} />
      <Box
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 3,
          boxShadow: "2",
          borderRadius: "5",
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="auto"
            fit="cover"
            image={`${URLBASE.imageBaseUrl}${item?.item_pics}`}
            alt="Event Image"
            // onClick={() =>handleGoEvent(box?.id)}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0.2,
              backgroundColor: "white",
              opacity: 0.7,
              px: 1,
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              fontFamily="Poppins"
              fontWeight="mediuum"
            >
              {item?.item_name}
               
            </Typography>
            <Divider />
            <Typography variant="caption" color="primary" fontFamily="Poppins">
            {item?.item_description}
            </Typography>
          </Box>
        </Box>
        
      </Box>
    </Box>
  )
}

export default Item
