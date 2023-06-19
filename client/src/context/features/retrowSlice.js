import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const getRetrow = createAsyncThunk(
  "retrow/getRetrow",
  
  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getRetrow(id);
        return { id, retrow: response.data };
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getRetrowForPost = createAsyncThunk(
    "retrow/getRetrowForPost",
    
    async(id, {rejectWithValue})=>{
        try{
          const response = await api.getRetrowForPost(id);
          return response.data;
        }catch(err){
          return rejectWithValue(err.response.data)
        }
    }
  )
  

const retrowSlice = createSlice({
  name: "retrow",
  initialState: {
    retrow:[],
    error: "",
    loading: false,
    retrowforpost:[],
    
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRetrow.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRetrow.fulfilled, (state, action) => {
        state.loading = false;
        const { id, retrow } = action.payload;
        state[id] = retrow;
      })
      .addCase(getRetrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getRetrowForPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getRetrowForPost.fulfilled, (state, action) => {
        state.loading = false;
        state.retrowforpost = action.payload
      })
      .addCase(getRetrowForPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default retrowSlice.reducer;
