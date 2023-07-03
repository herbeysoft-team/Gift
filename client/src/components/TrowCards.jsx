import { Box, CircularProgress, Grid,  Typography } from "@mui/material";
import React, {useId, useEffect, useMemo, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { TablePagination } from "@mui/material";
import { getMyTrowBox } from "../context/features/trowSlice";
import Stack from "@mui/material/Stack";
import TrowCard from "./TrowCard";

const TrowCards = () => {
  const uniqueId = useId;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { currentTrowBox, loadingmytrowbox} = useSelector((state) => ({ ...state.trow }));

  const memoizedItems = useMemo(() => currentTrowBox, [currentTrowBox]);

  useEffect(() => {
    dispatch(getMyTrowBox());
  }, [dispatch]);


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
        mt: 3,
        mb: 5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

  {!loadingmytrowbox?<>
      {memoizedItems.length > 0 ? (
        <>
          <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
            {memoizedItems.map((box, index) => {
              return (
                <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
                  <TrowCard
                    key={uniqueId}
                    box={box}
                    
                  />
                </Grid>
              );
            })}
          </Grid>
          <Stack spacing={2} alignItems="center">
            <TablePagination
              count={currentTrowBox.length}
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
        <Typography
        variant="h6"
        color="primary"
        fontFamily="Poppins"
        fontWeight="medium"
        textAlign="center"
        marginTop="5"
      >
        No Trowbox !!!
      </Typography>
      )}</> : (<Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="200px" /* Adjust the height as needed */
      >
        <CircularProgress size={52} color="secondary" />
      </Box>)}
    </Box>
  );
};

export default TrowCards;
