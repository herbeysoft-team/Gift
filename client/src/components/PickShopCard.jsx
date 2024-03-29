import {
    Box,
    CardContent,
    CardMedia,
    Checkbox,
    IconButton,
    Typography,
  } from "@mui/material";
  import React from "react";
  import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
  import CheckBoxIcon from '@mui/icons-material/CheckBox';

  import URLBASE from "../constant/urlbase";
  
  const PickShopCard = ({ gift, checked, selectedItems}) => {
    return (
      <Box sx={{ boxShadow: "2" }}>
        <CardMedia
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
          {gift?.item_name.length > 14
                ? `${gift?.item_name.substring(0, 14)}...`
                : gift?.item_name}
          </Typography>
          <IconButton aria-label="wishlist" size="large">
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon sx={{ color: "purple", fontSize: 24 }} />}
              checkedIcon={<CheckBoxIcon  sx={{ color: "purple", fontSize: 24 }} />}
              checked={selectedItems?.includes(gift.id)}
              onChange={checked}
            />
          </IconButton>
        </CardContent>
      </Box>
    );
  };
  
  export default PickShopCard;
  