import { Box, CircularProgress, Fab, } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import { Check, Save } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuccessUpdateItem,
  updateItem,
} from "../context/features/itemSlice";
import toast from "react-hot-toast";

const ItemActions = ({ params, rowId, setRowId }) => {
  const dispatch = useDispatch();
  const { successupdateitem, loadingupdateitem } = useSelector(
    (state) => state.item
  );
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (params.id === rowId) {
      if (!loadingupdateitem) {
        setLoading(true);
        const { item_name, item_description, item_subcategory, id } = params.row;
        
        try {
          await dispatch(
            updateItem({
              updatedValue: {
                id,
                item_name,
                item_description,
                item_subcategory,
              }, toast
            })
          );
          setSuccess(true);
        } catch (error) {
          console.error("Error updating Item:", error);
        } finally {
          setLoading(false);
        }
      }
    }
  };

  const handleDelete = async () => {
    if (params.id === rowId) {
      if (!loadingupdateitem) {
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
        dispatch(setSuccessUpdateItem());
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
      {success || successupdateitem ? (
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

export default ItemActions;
