import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const allgiftcount= createAsyncThunk(
    "gift/allgiftcount",
    async (_, { rejectWithValue }) => {

        try {
        const response = await api.allgiftcount();    
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

const giftSlice = createSlice({
    name: "gift",
    initialState: {
      allGiftCount: [],
      error: "",
      loading: false,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(allgiftcount.pending, (state) => {
          state.loading = true;
        })
        .addCase(allgiftcount.fulfilled, (state, action) => {
          state.loading = false;
          state.allGiftCount = action.payload;
        })
        .addCase(allgiftcount.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
     },
    
  });
  
 
  export default giftSlice.reducer;