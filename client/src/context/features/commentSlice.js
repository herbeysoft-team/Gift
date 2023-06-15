import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const addComment = createAsyncThunk(
  "comment/addComment",

  async({formData, toast}, {rejectWithValue})=>{
      try{
        const response = await api.addComment(formData);
        if(response){
          toast.success(response.data.message);
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


export const getComments = createAsyncThunk(
  "comment/getComments",
  
  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getComments(id);
        return { id, comments: response.data };
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getCommentsForPost = createAsyncThunk(
  "comment/getCommentsForPost",
  
  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getCommentsForPost(id);
        return response.data
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const deleteComment = createAsyncThunk(
    "comment/deleteComment",
  
    async(commentId, {rejectWithValue})=>{
        try{
          const response = await api.deleteComment(commentId);
          return response.data;
        }catch(err){
          return rejectWithValue(err.response.data)
        }
    }
  )



const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    error: "",
    loading: false,
    commentsforPost:[],
    
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        const { id, comments } = action.payload;
        state[id] = comments;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCommentsForPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCommentsForPost.fulfilled, (state, action) => {
        state.loading = false;
        state.commentsforPost = action.payload;
      })
      .addCase(getCommentsForPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }); 
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default commentSlice.reducer;
