import { Box, Fab, Grid, PaginationItem, Tooltip } from "@mui/material";
import React, { useState, useId, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../context/features/itemSlice";
import { addTrowWishlist } from "../context/features/trowSlice";
import { TablePagination } from "@mui/material";
import toast from "react-hot-toast";
import Stack from "@mui/material/Stack";
import PickShopCard from "./PickShopCard";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const PickShopCards = ({id, navigate}) => {
  const uniqueId = useId;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => ({ ...state.item }));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedItems, setSelectedItems] = useState([]);
  const memoizedItems = useMemo(() => items, [items]);

  useEffect(() => {
    // Check if trowWishlist already exists in local storage
    const trowWishlistsString = localStorage.getItem("trowWishlist");
    if (trowWishlistsString) {
      const trowWishlist = JSON.parse(trowWishlistsString);
      setSelectedItems(trowWishlist.trowWishlists_gift);
    } else {
      // Set default values and create userDetails in local storage
      const defaultTrowWishlist = {
        trowWishlists_gift: [],
      };

      localStorage.setItem("trowWishlist", JSON.stringify(defaultTrowWishlist));
    }
  }, []);

  const handleCheckboxChange = (itemId) => {
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      // Item is already selected, remove it from the array
      const updatedItems = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(updatedItems);
      // Retrieve "trowWishlist" from local storage
      const trowWishlistString = localStorage.getItem("trowWishlist");
      if (trowWishlistString) {
        // Parse the retrieved string into an object
        const trowWishlist = JSON.parse(trowWishlistString);
        // Update the wishlist
        trowWishlist.trowWishlists_gift = updatedItems;
        // Convert the updated object back to a string
        const updatedTrowWishlistsString = JSON.stringify(trowWishlist);
        // Set the updated string back into local storage
        localStorage.setItem("trowWishlist", updatedTrowWishlistsString);
        toast.success("Gift Removed from Wishlist");
      }
    } else {
      // Item is not selected, add it to the array
      const updatedItems = [...selectedItems, itemId];
      setSelectedItems(updatedItems);
      // Retrieve "trowDetails" from local storage
      const trowWishlistsString = localStorage.getItem("trowWishlist");
      if (trowWishlistsString) {
        // Parse the retrieved string into an object
        const trowWishlist = JSON.parse(trowWishlistsString);
        // Update the username value
        trowWishlist.trowWishlists_gift = updatedItems;
        // Convert the updated object back to a string
        const updatedTrowWishlistsString = JSON.stringify(trowWishlist);
        // Set the updated string back into local storage
        localStorage.setItem("trowWishlist", updatedTrowWishlistsString);
        toast.success("Gift Added to Wishlist");
      }
    }
  };

  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);

  if (!items.length) {
    return null;
  }
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleAddWishList = (e) => {
      e.preventDefault();
    //Function to add wishlist to a particular trowbox
    const trowWishlistsString = localStorage.getItem("trowWishlist");
    if (trowWishlistsString) {
      const trowWishlist = JSON.parse(trowWishlistsString);
      dispatch(addTrowWishlist({id, trowwishlist: trowWishlist, toast, navigate}));
      
    } 
    
  };

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
      {selectedItems.length > 0 ? (
        <Tooltip
          onClick={handleAddWishList}
          title="Add Wishlist"
          sx={{
            position: "fixed",
            bottom: 30,
            left: { xs: "calc(50% - 25px)", md: 30 },
          }}
        >
          <Fab color="primary" aria-label="Add Item">
            <AddShoppingCartIcon />
          </Fab>
        </Tooltip>
      ) : null}

      <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
        {memoizedItems.map((gift, index) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
              <PickShopCard
                key={uniqueId}
                gift={gift}
                checked={() => handleCheckboxChange(gift.id)}
                selectedItems={selectedItems}
              />
            </Grid>
          );
        })}
      </Grid>
      <Stack spacing={2} alignItems="center">
        <TablePagination
          count={items.length}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          // renderItem={(item) => (
          //   <PaginationItem
          //     icon={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
          //     {...item}
          //   />
          // )}
        />
      </Stack>
    </Box>
  );
};

export default PickShopCards;
