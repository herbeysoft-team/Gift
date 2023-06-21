import { Box, CircularProgress, Fab } from "@mui/material";
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessUpdateTrow, 
  updatetrowboxbyadmin,
} from "../context/features/trowSlice";

const TrowActions = ({ params, rowId, setRowId }) => {
  const dispatch = useDispatch();
  const { successupdatetrow, loadingupdatetrow } = useSelector(
    (state) => state.trow
  );

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (params.id === rowId) {
      if (!loadingupdatetrow) {
        setLoading(true);
        const { wishlist_sent, gift_sent, post, event_name, id } = params.row;
        try {
          await dispatch(
            updatetrowboxbyadmin({
              updatedValue: {
                id,
                wishlist_sent,
                gift_sent,
                post,
                event_name, 
              },
            })
          );
          setSuccess(true);
        } catch (error) {
          console.error("Error updating trowbox:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  useEffect(() => {
    if (rowId === params.id && success) {
      setTimeout(() => {
        setSuccess(false);
        dispatch(setSuccessUpdateTrow());
      }, 2000);
    }
  }, [rowId, success, params.id, dispatch]);

  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success || successupdatetrow ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "secondary.dark",
            "&:hover": { bgcolor: "secondary.dark" },
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSubmit}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: "secondary",
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default TrowActions;
