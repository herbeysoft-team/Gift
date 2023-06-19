import {
  Box,
  Button,
  CardContent,
  CardMedia,
  Checkbox,
  Fab,
  Grid,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TrowboxIcon from "../assets/trowbox.png";
import MobileNavBar from "../components/MobileNavBar";
import Logo from "../assets/logo.png";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTrow } from "../context/features/trowSlice";
import URLBASE from "../constant/urlbase";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { addTrowGift } from "../context/features/trowSlice";
import toast from "react-hot-toast";

const TrowBoxProcess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedItems, setSelectedItems] = useState([]);
  const id = useLocation().pathname.split("/")[3];
  const { trowDetails } = useSelector((state) => ({ ...state.trow }));
  const { user } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    if (id) {
      dispatch(getTrow(id));
    }
  }, [id, dispatch]);

  const handlePickWishlist = (e) => {
    e.preventDefault();
    navigate(`/home/pickshop/${id}`, {
      state: {
        previousUrl: `/home/trowboxprocess/${id}`,
      },
    });
  };

  const handleCheckboxChange = (itemId) => {
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      // Item is already selected, remove it from the array
      const updatedItems = selectedItems.filter((id) => id !== itemId);
      setSelectedItems(updatedItems);
    } else {
      // Item is not selected, add it to the array
      const updatedItems = [...selectedItems, itemId];
      setSelectedItems(updatedItems);
    }
  };

  const handleAddGiftToTrowbox = (e) => {
    e.preventDefault();
    dispatch(addTrowGift({ id, trowgift: selectedItems, toast, navigate}));
  };
  return (
    <Box flex={3}>
      <MobileNavBar logo={Logo} title={"TrowBox"} />

      {/* Header section  */}
      <Header logo={TrowboxIcon} title={trowDetails?.message} />
      {/* TrowBox Details */}
      <Box
        sx={{
          my: 1,
          marginX: { xs: "0.5rem", md: "0.5rem", lg: "3rem" },
          px: 1,
          py: 3,
        }}
      >
        <Typography
          variant="caption"
          color={"secondary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          TrowBox Name
        </Typography>

        <TextField
          value={trowDetails?.Trowbox?.event_name || ""}
          margin="normal"
          fullWidth
          size="normal"
          disabled
        />

        <Typography
          variant="caption"
          color={"secondary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          TrowBox Purpose
        </Typography>

        <TextField
          value={trowDetails?.Trowbox?.event_purpose || ""}
          margin="normal"
          fullWidth
          size="normal"
          disabled
        />

        <Typography
          variant="caption"
          color={"secondary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          Recommended Gift(s)
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={1} my={2}>
          {trowDetails?.recommended_gift?.length > 0 ? (
            trowDetails?.recommended_gift?.map((gift, index) => {
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <Box sx={{ boxShadow: "2" }}>
                    <CardMedia
                      component="img"
                      fit="cover"
                      image={`${URLBASE.imageBaseUrl}${gift?.item_pics}`}
                      alt={gift?.item_name}
                      sx={{ padding: "0.5em" }}
                    />

                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body" sx={{ fontSize: "12px" }}>
                        {gift?.item_name}
                      </Typography>
                    </CardContent>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Typography
              variant="vody"
              color={"primary"}
              sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
            >
              No Recommended Gift
            </Typography>
          )}
        </Grid>
        {/* Button to go to Shop */}
        {parseInt(user?.result.id) ===
          parseInt(trowDetails?.Trowbox?.sender_id) ||
        parseInt(trowDetails?.Trowbox?.wishlist_sent) === 1 ? null : (
          <Button
            variant="contained"
            endIcon={<AddShoppingCartIcon />}
            onClick={handlePickWishlist}
          >
            Pick Your Wishlist
          </Button>
        )}

        {/* recipient wishlist */}
        <Typography
          variant="caption"
          color={"secondary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          {user?.result.phone_no === trowDetails?.Trowbox?.recipient_no
            ? "My WIshlist(s)"
            : "Recipient Wishlist(s)"}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={1} my={2}>
          {trowDetails?.wishlist_gift?.length > 0 ? (
            trowDetails?.wishlist_gift?.map((gift, index) => {
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <Box sx={{ boxShadow: "2" }}>
                    <CardMedia
                      component="img"
                      fit="cover"
                      image={`${URLBASE.imageBaseUrl}${gift?.item_pics}`}
                      alt={gift?.item_name}
                      sx={{ padding: "0.5em" }}
                    />

                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body" sx={{ fontSize: "12px" }}>
                        {gift?.item_name}
                      </Typography>
                      {parseInt(trowDetails?.Trowbox?.gift_sent) === 1 || trowDetails?.Trowbox?.recipient_no === user?.result.phone_no ? null : (
                        <IconButton aria-label="wishlist" size="large">
                          <Checkbox
                            icon={
                              <CheckBoxOutlineBlankIcon
                                sx={{ color: "purple", fontSize: 24 }}
                              />
                            }
                            checkedIcon={
                              <CheckBoxIcon
                                sx={{ color: "purple", fontSize: 24 }}
                              />
                            }
                            checked={selectedItems?.includes(gift.id)}
                            onChange={() => handleCheckboxChange(gift.id)}
                          />
                        </IconButton>
                      )}
                    </CardContent>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Typography
              variant="vody"
              color={"primary"}
              sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
            >
              No Wishlist Yet !
            </Typography>
          )}
        </Grid>
        {/* Trowbox Gift */}
        <Typography
          variant="caption"
          color={"secondary"}
          sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
        >
          {user?.result.phone_no === trowDetails?.Trowbox?.recipient_no
            ? "My Gift(s)"
            : "Recipient GIft(s)"}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={1} my={2}>
          {trowDetails?.trowbox_gift?.length > 0 ? (
            trowDetails?.trowbox_gift?.map((gift, index) => {
              return (
                <Grid item xs={4} sm={4} md={4} lg={4} key={index}>
                  <Box sx={{ boxShadow: "2" }}>
                    <CardMedia
                      component="img"
                      fit="cover"
                      image={`${URLBASE.imageBaseUrl}${gift?.item_pics}`}
                      alt={gift?.item_name}
                      sx={{ padding: "0.5em" }}
                    />

                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body" sx={{ fontSize: "12px" }}>
                        {gift?.item_name}
                      </Typography>
                      {parseInt(trowDetails?.Trowbox?.gift_sent) === 1 ? null : (
                        <IconButton aria-label="wishlist" size="large">
                          <Checkbox
                            icon={
                              <CheckBoxOutlineBlankIcon
                                sx={{ color: "purple", fontSize: 24 }}
                              />
                            }
                            checkedIcon={
                              <CheckBoxIcon
                                sx={{ color: "purple", fontSize: 24 }}
                              />
                            }
                            checked={selectedItems?.includes(gift.id)}
                            onChange={() => handleCheckboxChange(gift.id)}
                          />
                        </IconButton>
                      )}
                    </CardContent>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <Typography
              variant="vody"
              color={"primary"}
              sx={{ fontFamily: "Poppins", fontWeight: "normal" }}
            >
              No gift yet!
            </Typography>
          )}
        </Grid>
        {selectedItems.length > 0 ? (
          <Tooltip
            onClick={handleAddGiftToTrowbox}
            title="Add Gift"
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
      </Box>
    </Box>
  );
};

export default TrowBoxProcess;
