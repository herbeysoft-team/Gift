import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getUserProfile = createAsyncThunk(
    "user/getUserProfile",
    
    async (userId, { rejectWithValue }) => {
        try {
        const response = await api.getUserProfile(userId);
        
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  const userSlice = createSlice({
    name: "user",
    initialState: {
      userProfile: null,
      error: "",
      loading: false,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserProfile.pending, (state) => {
          state.loading = true;
        })
        .addCase(getUserProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.userProfile = action.payload;
          })
          .addCase(getUserProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
          })
        
    },
    
  });
  
  
  export default userSlice.reducer;