import { Box, Grid, PaginationItem, Typography  } from '@mui/material'
import React, { useState, useId, useEffect, useMemo } from 'react'
import ScheduleCard from './ScheduleCard'
import { useSelector, useDispatch } from "react-redux";
import { TablePagination } from "@mui/material";
import { getMyScheduleTrowBox } from "../context/features/trowSlice";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ScheduleCards = () => {
  const uniqueId = useId;
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { scheduleTrowBox} = useSelector((state) => ({ ...state.trow }));

  const memoizedItems = useMemo(() => scheduleTrowBox, [scheduleTrowBox]);

  useEffect(() => {
    dispatch(getMyScheduleTrowBox());
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


      {memoizedItems.length > 0 ? (
        <>
          <Grid key={uniqueId} container rowSpacing={1} columnSpacing={1}>
            {memoizedItems.map((box, index) => {
              return (
                <Grid item xs={12} sm={12} md={12} lg={6} key={index}>
                  <ScheduleCard
                    key={uniqueId}
                    box={box}
                    
                  />
                </Grid>
              );
            })}
          </Grid>
          <Stack spacing={2} alignItems="center">
            <TablePagination
              count={scheduleTrowBox.length}
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
          No Schedule TrowBox!!!
        </Typography>
      )}
    </Box>
  )
}

export default ScheduleCards
