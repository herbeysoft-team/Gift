import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonGroup,
  CardMedia,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import EventNoteIcon from "@mui/icons-material/EventNote";
import React, { useState, useEffect } from "react";
import MobileNavBar from "../components/MobileNavBar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import Logo from "../assets/logo.png";
import { deepPurple } from "@mui/material/colors";
import { getEvent } from "../context/features/trowSlice";
import { useSelector, useDispatch } from "react-redux";
import URLBASE from "../constant/urlbase";
import PostGift from "../components/PostGift";
import { useLocation, useNavigate } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import styled from "@emotion/styled";
import CloseIcon from "@mui/icons-material/Close";
import { createPost } from "../context/features/postSlice";
import toast from "react-hot-toast";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const EventDetails = () => {
  const [gift, setGift] = useState(false);
  const [btnName, setBtnName] = useState("SHOW GIFT ITEMS");
  const [iconGift, setIconGift] = useState(<ArrowDropDownIcon />);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useLocation().pathname.split("/")[3];
  const { eventDetails, loadingevent} = useSelector((state) => ({ ...state.trow }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (id) {
      dispatch(getEvent(id));
    }
  }, [id, dispatch]);

  const handlePickGift = (e) => {
    e.preventDefault();
    navigate(`/home/pickgift/${id}`, {
      state: {
        previousUrl: `/home/eventdetails/${id}`,
      },
    });
  };

  const handleGoProfile = (id) => {
    if (id) {
      navigate(`/home/profile/${id}`);
    }
  };

  const handlePostEvent = async (e) => {
    e.preventDefault();

    if (id) {
      dispatch(
        createPost({
          formData: {
            id,
            description,
          },
          navigate,
          toast,
        })
      );
    }
    setOpen(false);
    setDescription("");
  };

  //function called when any input value is changed
  const onInputChange = (e) => {
    setDescription(e.target.value);
  };

  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"Event"} />
      {/* The Event Details Start Here  */}
      {!loadingevent ? <>
      <Box
        position="sticky"
        sx={{
          marginTop: 1,
          marginRight: 1,
          marginLeft: 1,
          marginBottom: 3,
          top: 10,
          left: 0,
          right: 0,
          boxShadow: "2",
          borderRadius: "5",
          zIndex: 2,
        }}
      >
        <Box sx={{ position: "relative", overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="auto"
            fit="cover"
            image={`${URLBASE.imageBaseUrl}${eventDetails?.event_box?.event_pics}`}
            alt="Event Image"
          />
          <IconButton
            aria-label="option"
            size="large"
            sx={{ position: "absolute", top: 5, right: 10 }}
          >
            <Badge
              badgeContent={
                eventDetails?.event_gift?.length > 0
                  ? eventDetails?.event_gift?.length
                  : "0"
              }
              color="primary"
            >
              <CardGiftcardIcon color="secondary" sx={{ fontSize: 32 }} />
            </Badge>
          </IconButton>
          {eventDetails?.event_box?.userId === user?.result?.id &&
          parseInt(eventDetails?.event_box?.post) === 0  && eventDetails?.event_gift?.length > 0 ? (
            <IconButton
              aria-label="share"
              size="large"
              sx={{ position: "absolute", top: 5, left: 10 }}
              onClick={() => setOpen(true)}
            >
              <IosShareIcon color="secondary" sx={{ fontSize: 40 }} />
            </IconButton>
          ) : null}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              display: "flex",
              flexDirection: "column",
              gap: 0.2,
              backgroundColor: "white",
              opacity: 0.7,
              px: 1,
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              fontFamily="Poppins"
              fontWeight="mediuum"
            >
              {eventDetails?.event_box?.event_name.length > 20
                ? `${eventDetails?.event_box?.event_name.substring(0, 17)}...`
                : eventDetails?.event_box?.event_name}
            </Typography>
            <Divider />
            <Typography variant="caption" color="primary" fontFamily="Poppins">
              {eventDetails?.event_box?.event_purpose.length > 30
                ? `${eventDetails?.event_box?.event_purpose.substring(
                    0,
                    27
                  )}...`
                : eventDetails?.event_box?.event_purpose}
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          justifyItems="center"
          sx={{ backgroundColor: "white", p: 1, zIndex: 2 }}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={1}
            sx={{ justifyContent: "center", alignItems: "center" }}
            key={eventDetails?.event_box?.userId}
            onClick={() => handleGoProfile(eventDetails?.event_box?.userId)}
          >
            <Avatar
              alt={`PP`}
              src={`${URLBASE.imageBaseUrl}${eventDetails?.event_box?.profilePic}`}
              sx={{ bgcolor: deepPurple[500] }}
            />
            <Typography variant="body">
              {parseInt(user?.result.id) ===
              parseInt(eventDetails?.event_box?.userId)
                ? "You"
                : eventDetails?.event_box?.fullname.length > 15
                ? `${eventDetails?.event_box?.fullname.substring(0, 15)}...`
                : eventDetails?.event_box?.fullname}
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyItems="center"
            gap={1}
          >
            <EventNoteIcon fontSize={"large"} color="primary" sx={{}} />
            <Typography variant="caption" sx={{ fontFamily: "Poppins" }}>
              {eventDetails?.event_box?.event_date}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="self-start"
        px={1.5}
      >
        {/* The Gift for the event */}
        <Button
          variant="text"
          onClick={() => {
            setGift(!gift);
            if (!gift) {
              setBtnName("HIDE GIFT ITEMS");
              setIconGift(<ArrowDropDownIcon />);
            } else {
              setBtnName("SHOW GIFT ITEMS");
              setIconGift(<ArrowDropUpIcon />);
            }
          }}
          sx={{
            color: "primary",
            fontFamily: "Poppins",
            fontWeight: "bold",
            textAlign: "center",
          }}
          endIcon={iconGift}
        >
          {btnName}
        </Button>
        {gift ? (
          <>
            {eventDetails?.event_gift?.length > 0 ? (
              <Box width="100%">
                {eventDetails?.event_gift.map((box, index) => {
                  return <PostGift key={index} box={box} />;
                })}
              </Box>
            ) : (
              <Typography
                variant="h6"
                color="primary"
                fontFamily="Poppins"
                fontWeight="medium"
                textAlign="center"
              >
                No Gift Yet!
              </Typography>
            )}
          </>
        ) : null}
      </Box>
      {/* Button to go to Shop */}
      <Box
        position="sticky"
        botton="10"
        display="flex"
        alignContent="center"
        justifyContent="center"
        mb={10}
        mt={3}
      >
        {parseInt(user?.result.id) ===
        parseInt(eventDetails?.event_box?.userId) ? null : (
          <Button
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
            onClick={handlePickGift}
          >
            {eventDetails?.event_gift?.length > 0
              ? "Add Gift to the Event"
              : "Be the first to add gift"}
          </Button>
        )}
      </Box>
      </> :(<Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="200px" /* Adjust the height as needed */
      >
        <CircularProgress size={52} color="secondary" />
      </Box>)}
      {/* for the modal */}
      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          width={400}
          height={280}
          component="form"
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          noValidate
          autoComplete="off"
        >
          <Typography
            style={{ marginBottom: "1rem" }}
            color="primary"
            fontFamily="Poppins"
            fontWeight="mediuum"
            variant="h6"
          >
            Share with your network!
          </Typography>

          <TextField
            sx={{ width: "100%", marginBottom: "10px" }}
            required
            type="text"
            id="description"
            name="description"
            label="Add Description"
            multiline
            rows={3}
            value={description || ""}
            size="small"
            margin="dense"
            onChange={onInputChange}
          />

          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button onClick={handlePostEvent}>Post It</Button>
            <Button
              color="secondary"
              sx={{ width: "100px" }}
              onClick={() => setOpen(false)}
            >
              <CloseIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </SytledModal>
    </Box>
  );
};

export default EventDetails;
