import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const addLike= createAsyncThunk(
  "like/addLike",

  async({formData, toast}, {rejectWithValue})=>{
      try{
        const response = await api.addLike(formData);
        if(response){
          toast.success(response.data.message);
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


export const getLikes = createAsyncThunk(
  "like/getLikes",
  
  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getLikes(id);
        return { id, likes: response.data };
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getLikesCount = createAsyncThunk(
  "like/getLikesCount",
  
  async(userId, {rejectWithValue})=>{
      try{
        const response = await api.getLikesCount(userId);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getLikesForPost = createAsyncThunk(
  "like/getLikesForPost",
  
  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getLikesForPost(id);
        return response.data
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const deleteLike = createAsyncThunk(
    "like/deleteLike",
    async({id, toast}, {rejectWithValue})=>{
        try{
          const response = await api.deleteLike(id);
          if(response){
            toast.success(response.data.message);
          }
          return response.data;
        }catch(err){
          return rejectWithValue(err.response.data)
        }
    }
  )



const commentSlice = createSlice({
  name: "like",
  initialState: {
    likes: [],
    error: "",
    loading: false,
    likesforPost:[],
    upvoteCount:"",
    
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(addLike.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.loading = false;
        const { id, likes } = action.payload;
        state[id] = likes;
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLikesForPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikesForPost.fulfilled, (state, action) => {
        state.loading = false;
        state.likesforPost = action.payload;
      })
      .addCase(getLikesForPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getLikesCount.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLikesCount.fulfilled, (state, action) => {
        state.loading = false;
        state.upvoteCount = action.payload;
      })
      .addCase(getLikesCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteLike.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }); 
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default commentSlice.reducer;
