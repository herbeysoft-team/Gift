import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const createTrow = createAsyncThunk(
  "trow/createTrow",

  async({formData, navigate, toast}, {rejectWithValue})=>{
      try{
        const response = await api.createTrow(formData);
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

export const createReTrow = createAsyncThunk(
  "trow/createReTrow",

  async({formData, navigate, toast}, {rejectWithValue})=>{
      try{
        const response = await api.createReTrow(formData);
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

export const createEvent = createAsyncThunk(
  "trow/createEvent",

  async({formData, navigate, toast}, {rejectWithValue})=>{
      try{
        const response = await api.createEvent(formData);
        if(response){
          toast.success(response.data.message);
          navigate("/home/trowbox");

        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getTrow = createAsyncThunk(
  "trow/getTrow",

  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getTrow(id);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getUserSentGift = createAsyncThunk(
  "trow/getUserSentGift",

  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getUserSentGift(id);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)
export const getEvent = createAsyncThunk(
  "trow/getEvent",

  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getEvent(id);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getAllEvent = createAsyncThunk(
  "trow/getAllEvent",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getAllEvent();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


export const getMyTrowBox = createAsyncThunk(
  "trow/getMyTrowBox",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getMyTrowBox();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getMyScheduleTrowBox = createAsyncThunk(
  "trow/getMyScheduleTrowBox",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getMyScheduleTrowBox();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


export const addTrowWishlist = createAsyncThunk(
  "trow/addTrowWishlist",

  async({id, trowwishlist, toast, navigate}, {rejectWithValue})=>{
      try{
        const response = await api.addTrowWishlist(id, trowwishlist);
        if(response){
          toast.success(response.data.message);
          navigate(`/home/trowboxprocess/${id}`)
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const addTrowGift = createAsyncThunk(
  "trow/addTrowGift",

  async({id, trowgift, toast, navigate}, {rejectWithValue})=>{

      try{
        const response = await api.addTrowGift(id, trowgift);
        if(response){
          toast.success(response.data.message);
          navigate(`/home/eventdetails/${id}`)
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)




const trowSlice = createSlice({
  name: "trow",
  initialState: {
    trowDetails: null,
    currentTrowBox: [],
    scheduleTrowBox: [],
    eventDetails:[],
    allEvent:[],
    userSentGift:[],
    loadingusersentgift:false,
    error: "",
    loadingallevent:false,
    loading: false,
    loadingevent:false,
    loadingmytrowbox:false,
    loadingmyschedulebox:false,
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrow.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTrow.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.removeItem("trowDetails");
      })
      .addCase(createTrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createReTrow.pending, (state) => {
        state.loading = true;
      })
      .addCase(createReTrow.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(createReTrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getTrow.pending, (state) => {
        state.loading = true;
      })
      .addCase(getTrow.fulfilled, (state, action) => {
        state.loading = false;
        state.trowDetails = action.payload;
      })
      .addCase(getTrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEvent.pending, (state) => {
        state.loadingevent = true;
      })
      .addCase(getEvent.fulfilled, (state, action) => {
        state.loadingevent = false;
        state.eventDetails = action.payload;
      })
      .addCase(getEvent.rejected, (state, action) => {
        state.loadingevent = false;
        state.error = action.payload;
      })
      .addCase(addTrowWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrowWishlist.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.removeItem("trowWishlist");
      })
      .addCase(addTrowWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTrowGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(addTrowGift.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addTrowGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getMyTrowBox.pending, (state) => {
        state.loadingmytrowbox = true;
      })
      .addCase(getMyTrowBox.fulfilled, (state, action) => {
        state.loadingmytrowbox = false;
        state.currentTrowBox = action.payload;
      })
      .addCase(getMyTrowBox.rejected, (state, action) => {
        state.loadingmytrowbox = false;
        state.error = action.payload;
      })
      .addCase(getMyScheduleTrowBox.pending, (state) => {
        state.loadingmyschedulebox = true;
      })
      .addCase(getMyScheduleTrowBox.fulfilled, (state, action) => {
        state.loadingmyschedulebox = false;
        state.scheduleTrowBox = action.payload;
      })
      .addCase(getMyScheduleTrowBox.rejected, (state, action) => {
        state.loadingmyschedulebox = false;
        state.error = action.payload;
      })
      .addCase(getAllEvent.pending, (state) => {
        state.loadingallevent = true;
      })
      .addCase(getAllEvent.fulfilled, (state, action) => {
        state.loadingallevent = false;
        state.allEvent = action.payload;
      })
      .addCase(getAllEvent.rejected, (state, action) => {
        state.loadingallevent = false;
        state.error = action.payload;
      })
      .addCase(getUserSentGift.pending, (state) => {
        state.loadingusersentgift = true;
      })
      .addCase(getUserSentGift.fulfilled, (state, action) => {
        state.loadingusersentgift = false;
        state.userSentGift = action.payload;
      })
      .addCase(getUserSentGift.rejected, (state, action) => {
        state.loadingusersentgift = false;
        state.error = action.payload;
      })
      
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default trowSlice.reducer;
