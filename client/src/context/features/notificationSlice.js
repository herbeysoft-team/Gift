import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const getMyNotification = createAsyncThunk(
  "notification/getMyNotification",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getMyNotification();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const hasUnreadNotification = createAsyncThunk(
  "notification/hasUnreadNotification",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.hasUnreadNotification();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)



const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    error: "",
    loading: false,
    notifications: [],
    hasunreadnotification:false,

  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMyNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications= action.payload;
      })
      .addCase(getMyNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(hasUnreadNotification.pending, (state) => {
        state.loading = true;
      })
      .addCase(hasUnreadNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.hasunreadnotification = action.payload;
      })
      .addCase(hasUnreadNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default notificationSlice.reducer;
