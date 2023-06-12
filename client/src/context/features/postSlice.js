import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const createPost = createAsyncThunk(
  "post/createPost",

  async({formData, navigate, toast}, {rejectWithValue})=>{
    console.log(formData)
      try{
        const response = await api.createPost(formData);
        if(response){
          toast.success(response.data.message);
          navigate("/home/");

        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


export const getPosts = createAsyncThunk(
  "post/getPosts",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getPosts();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)



const postSlice = createSlice({
  name: "post",
  initialState: {
    error: "",
    loading: false,
    posts: [],
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
      
      
      
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default postSlice.reducer;
