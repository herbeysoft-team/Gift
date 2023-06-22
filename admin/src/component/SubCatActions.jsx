import { Box, CircularProgress, Fab, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessUpdateSubCat,
  updateSubCat,
} from "../context/features/itemSlice";
import toast from "react-hot-toast";

const SubCatActions = ({ params, rowId, setRowId }) => {
  const dispatch = useDispatch();
  const { successupdatesubcat, loadingupdatesubcat } = useSelector(
    (state) => state.item
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (params.id === rowId) {
      if (!loadingupdatesubcat) {
        setLoading(true);
        const { cat_id, sub_cat_name, id } = params.row;
        
        try {
          await dispatch(
            updateSubCat({
              updatedValue: {
                id,
                cat_id,
                sub_cat_name,
              },toast}));
          setSuccess(true);
        } catch (error) {
          console.error("Error updating subcategory:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleDelete = async () => {
    if (params.id === rowId) {
      if (!loadingupdatesubcat) {
        setLoading(true);
        const { sender_id, trowbox_id, status, id } = params.row;
        try {
        //   await dispatch(
        //     updategiftbyadmin({
        //       updatedValue: {
        //         id,
        //         sender_id,
        //         trowbox_id,
        //         status,
        //       },
        //     })
        //   );
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
        dispatch(setSuccessUpdateSubCat());
      }, 2000);
    }
  }, [rowId, success, params.id, dispatch]);

  return (
    <Box flexDirection="row" display="flex" >
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      {success || successupdatesubcat ? (
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
   
    <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            alignSelf:"center"
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleDelete}
        >
        
          <DeleteIcon />
        </Fab>
    
    </Box>
  );
};

export default SubCatActions;
