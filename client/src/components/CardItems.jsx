import { Box, Grid, PaginationItem } from "@mui/material";
import React, { useState, useId, useEffect, useMemo } from "react";
import CardItem from "./CardItem";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../context/features/itemSlice";
import { TablePagination } from "@mui/material";

import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";


const CardItems = () => {
  const uniqueId = useId;
  const dispatch = useDispatch();
  const { items } = useSelector((state) => ({ ...state.item }));
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedItems, setSelectedItems] = useState([]);
  const memoizedItems = useMemo(() => items, [items]);

  useEffect(() => {
    // Check if trowDetails already exists in local storage
    const trowDetailsString = localStorage.getItem("trowDetails");
    if (trowDetailsString) {
      const trowDetails = JSON.parse(trowDetailsString);
      setSelectedItems(trowDetails.recommended_gift);
    }
  }, []);

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
      <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
        {memoizedItems.map((gift, index) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={4}>
              <CardItem
                key={uniqueId}
                gift={gift}
                checked={() => handleCheckboxChange(gift.id)}
                selectedItems = {selectedItems}
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
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </Box>
  );
};

export default CardItems;
