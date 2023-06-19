import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";



export const getShare = createAsyncThunk(
  "message/getShare",
  
  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getShare(id);
        return { id, share: response.data };
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getShareForPost = createAsyncThunk(
    "message/getShareForPost",
    
    async(id, {rejectWithValue})=>{
        try{
          const response = await api.getShareForPost(id);
          return response.data;
        }catch(err){
          return rejectWithValue(err.response.data)
        }
    }
  )



const shareSlice = createSlice({
  name: "share",
  initialState: {
    error: "",
    loading: false,
    share: [],
    shareforpost: [],

    
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getShare.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShare.fulfilled, (state, action) => {
        state.loading = false;
        const { id, share } = action.payload;
        state[id] = share;
      })
      .addCase(getShare.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getShareForPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getShareForPost.fulfilled, (state, action) => {
        state.loading = false;
        state.shareforpost = action.payload;
       
      })
      .addCase(getShareForPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default shareSlice.reducer;
