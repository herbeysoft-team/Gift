import {
    Box,
    CardContent,
    CardMedia,
    Checkbox,
    IconButton,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { Favorite } from "@mui/icons-material";
  import URLBASE from "../constant/urlbase";
  import { useNavigate} from "react-router-dom";
  
  const WishCard = ({ gift, checked}) => {
    const navigate = useNavigate();

    return (
      <Box sx={{ boxShadow: "2" }}>
        <CardMedia
          onClick={()=> navigate(`/home/item/${gift?.id}`)}
          component="img"
          fit="cover"
          image={`${URLBASE.imageBaseUrl}${gift?.item_pics}`}
          alt={gift?.item_name}
          sx={{ padding: "0.5em" }}
        />
  
        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Typography variant="body" sx={{ fontSize: "12px" }}>
            {gift?.item_name}
          </Typography>
          <IconButton aria-label="wishlist" size="large">
            <Checkbox
              icon={<Favorite sx={{ color: "purple", fontSize: 24 }} />}
              checkedIcon={<Favorite sx={{ color: "purple", fontSize: 24 }} />}
            //   checked={selectedItems?.includes(gift.id)}
              onChange={checked}
            />
          </IconButton>
        </CardContent>
      </Box>
    );
  };
  
  export default WishCard;
  