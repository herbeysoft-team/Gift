import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useId, useEffect, useMemo } from "react";
import WishCard from "./WishCard";
import { useSelector, useDispatch } from "react-redux";
import { wishlists, removeWishlist } from "../context/features/wishlistSlice";
import { TablePagination } from "@mui/material";
import toast from "react-hot-toast";
import Stack from "@mui/material/Stack";

const WishCards = ({ user_id, wishlist }) => {
  const uniqueId = useId;
  const dispatch = useDispatch();
  const { wishes } = useSelector((state) => ({ ...state.wishlist }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const memoizedItems = useMemo(() => wishes, [wishes]);

  useEffect(() => {
    dispatch(wishlists(user_id));
  }, [dispatch, user_id]);

  const handleRemoveWishlist = (itemId) => {
    if (parseInt(user?.result?.id) === parseInt(user_id)) {
      dispatch(removeWishlist({ item_id: itemId, toast }));
      dispatch(wishlists(user_id));
    }
  };

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
      {memoizedItems.length > 0 ? (
        <>
          <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
            {memoizedItems.map((gift, index) => {
              return (
                <Grid item xs={6} sm={6} md={6} lg={4} key={index}>
                  <WishCard
                    key={uniqueId}
                    gift={gift}
                    checked={() => handleRemoveWishlist(gift.id)}
                    //selectedItems={wishlist ? my_wishlist : selectedItems }
                  />
                </Grid>
              );
            })}
          </Grid>
          <Stack spacing={2} alignItems="center">
            <TablePagination
              count={wishes.length}
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
        </>
      ) : (
        <Typography  variant="h5"
        color="primary"
        fontFamily="Poppins"
        fontWeight="medium"
        textAlign="center">
          No Wishlist!!!
        </Typography>
      )}
    </Box>
  );
};

export default WishCards;
