import { Box, CircularProgress, Fab, Typography } from "@mui/material";
import React, { useEffect, useMemo} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllEvent } from "../context/features/trowSlice";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";

import Event from "./Event";

const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allEvent, loadingallevent } = useSelector((state) => ({ ...state.trow }));

  const memoizedEvent = useMemo(() => allEvent, [allEvent]);

  useEffect(() => {
    dispatch(getAllEvent());
  }, [dispatch]);


  return (
    <Box mb={10}>
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
      {!loadingallevent ? <>
      {memoizedEvent.length > 0 ? (
        <>
          {memoizedEvent.map((box, index) => {
            return <Event key={box.id} box={box} />;
          })}
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

export default Events;
