import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import MobileNavBar from "../components/MobileNavBar";
import Notify from "../assets/Notify.png";
import NotifyHeader from "../assets/NotifyHeader.png";
import Header from "../components/Header";
import NotifyCard from "../components/NotifyCard";
import { useSelector, useDispatch } from "react-redux";
import { getMyNotification } from "../context/features/notificationSlice";

const Notification = () => {
  const dispatch = useDispatch();
  const { notifications } = useSelector((state) => ({ ...state.notification }));

  useEffect(() => {
    dispatch(getMyNotification());
  }, [dispatch]);

  const memoizedNotification = useMemo(() => notifications, [notifications]);

  return (
    <Box flex={3}>
      <MobileNavBar logo={Notify} title={"Notifications"} />

      {/* Header section  */}
      <Header logo={NotifyHeader} title={"My Notifications"} />

      {/* Other Sections start here */}
      <Box
        sx={{
          width: "100%",
          px: 1,
          py: 0.5,
          mb:10,
        }}
      >
        {memoizedNotification.length > 0 ? (
          <>
            {memoizedNotification.map((notification, index) => {
              return (
                <NotifyCard key={notification.id} notification={notification} />
              );
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
            No Notification
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Notification;
