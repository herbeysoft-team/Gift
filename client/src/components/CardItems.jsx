import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useState, useId, useEffect, useMemo } from "react";
import CardItem from "./CardItem";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../context/features/itemSlice";
import toast from "react-hot-toast";
import {
  addWishlist,
  removeWishlist,
  myWishlist,
} from "../context/features/wishlistSlice";

const CardItems = ({ wishlist }) => {
  const uniqueId = useId;
  const dispatch = useDispatch();
  const { items, loadingItems } = useSelector((state) => ({ ...state.item }));
  const { my_wishlist } = useSelector((state) => ({ ...state.wishlist }));
  const [selectedItems, setSelectedItems] = useState([]);
  const memoizedItems = useMemo(() => items, [items]);
  const memoizedWishList = useMemo(() => my_wishlist, [my_wishlist]);

  useEffect(() => {
    // Check if trowDetails already exists in local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      const trowDetails = JSON.parse(trowDetailsString);
      setSelectedItems(trowDetails.recommended_gift);
    }
  }, []);

  useEffect(() => {
    // Check if trowDetails already exists in local storage
    dispatch(myWishlist());
  }, [dispatch]);

  const handleCheckboxChange = (itemId) => {
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      // Item is already selected, remove it from the array
      const updatedItems = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(updatedItems);
      // Retrieve "trowDetails" from local storage
      const trowDetailsString = localStorage.getItem("trowDetails");
      if (trowDetailsString) {
        // Parse the retrieved string into an object
        const trowDetails = JSON.parse(trowDetailsString);
        // Update the username value
        trowDetails.recommended_gift = updatedItems;
        // Convert the updated object back to a string
        const updatedTrowDetailsString = JSON.stringify(trowDetails);
        // Set the updated string back into local storage
        localStorage.setItem("trowDetails", updatedTrowDetailsString);
      }
    } else {
      // Item is not selected, add it to the array
      const updatedItems = [...selectedItems, itemId];
      setSelectedItems(updatedItems);
      // Retrieve "trowDetails" from local storage
      const trowDetailsString = localStorage.getItem("trowDetails");
      if (trowDetailsString) {
        // Parse the retrieved string into an object
        const trowDetails = JSON.parse(trowDetailsString);
        // Update the username value
        trowDetails.recommended_gift = updatedItems;
        // Convert the updated object back to a string
        const updatedTrowDetailsString = JSON.stringify(trowDetails);
        // Set the updated string back into local storage
        localStorage.setItem("trowDetails", updatedTrowDetailsString);
      }
    }
  };

  const handleAddToWishlist = (itemId) => {
    const isSelected = memoizedWishList.includes(itemId);

    if (isSelected) {
      // Item is already in the wishlist, remove it
      dispatch(removeWishlist({ item_id: itemId, toast }));
      dispatch(myWishlist());
    } else {
      // Item is not in the wishlist, add it
      dispatch(addWishlist({ item_id: itemId, toast }));
      dispatch(myWishlist());
    }
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  if (!items.length) {
    return null;
  }

  return (
    <Box
      sx={{
        mx: 1,
        mt: 3,
        mb: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {!loadingItems ? (
        <>
          <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
            {memoizedItems.map((gift, index) => {
              return (
                <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
                  <CardItem
                    key={uniqueId}
                    gift={gift}
                    checked={
                      wishlist
                        ? () => handleAddToWishlist(gift.id)
                        : () => handleCheckboxChange(gift.id)
                    }
                    selectedItems={wishlist ? my_wishlist : selectedItems}
                  />
                </Grid>
              );
            })}
          </Grid>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="200px" /* Adjust the height as needed */
        >
          <CircularProgress size={52} color="secondary" />
        </Box>
      )}
      
    </Box>

  );
};

export default CardItems;
