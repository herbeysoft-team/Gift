import { Box, Fab, Stack, TablePagination, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvent } from "../context/features/trowSlice";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import Event from "./Event";

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { user } = useSelector((state) => ({ ...state.auth }));
  const { allEvent } = useSelector((state) => ({ ...state.trow }));

  const memoizedEvent = useMemo(() => allEvent, [allEvent]);

  useEffect(() => {
    dispatch(getAllEvent());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      {/* The Gift Box Button */}
      <Box
        p={2}
        sx={{
          elevation: 2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          boxShadow: 1,
          gap: 1,
        }}
      >
        <Fab
          color={"primary"}
          size="large"
          aria-label="add"
          onClick={() => navigate("/home/createevent")}
        >
          <EventAvailableIcon size="large" />
        </Fab>
        <Typography variant="body">Create Event!</Typography>
      </Box>

      {/* The Post Here */}
      {memoizedEvent.length > 0 ? (
        <>
          {memoizedEvent.map((box, index) => {
            return <Event key={box.id} box={box} />;
          })}
          <Stack spacing={2} alignItems="center">
            <TablePagination
              count={allEvent.length}
              component="div"
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Stack>
        </>
      ) : (
        <Typography
          variant="h5"
          color="primary"
          fontFamily="Poppins"
          fontWeight="medium"
          textAlign="center"
        >
          No Event
        </Typography>
      )}
    </Box>
  );
};

export default Events;
