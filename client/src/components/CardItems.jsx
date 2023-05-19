import { Box, Grid, PaginationItem } from "@mui/material";
import React, { useState, useId, useEffect } from "react";
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
  const [rowsPerPage, setRowsPerPage] = useState(20);

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
      <Grid container rowSpacing={1} columnSpacing={1}>
        {items.map((gift, index) => {
          return (
            <Grid item xs={6} sm={6} md={6} lg={4}>
              <CardItem key={uniqueId} gift={gift} />
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
