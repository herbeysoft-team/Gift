import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const sendMessage = createAsyncThunk(
  "message/sendMessage",

  async({formData, toast}, {rejectWithValue})=>{
      try{
        const response = await api.sendMessage(formData);
        if(response){
          toast.success(response.data.message);
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const sendMessageMedia = createAsyncThunk(
  "message/sendMessageMedia",

  async({formData, toast, navigate, userId}, {rejectWithValue})=>{
      try{
        const response = await api.sendMessageMedia(formData);
        if(response){
          toast.success(response.data.message);
          navigate(`/home/messagedetails/${userId}`)
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


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

export const getMessages = createAsyncThunk(
  "message/getMessages",
  
  async(userId, {rejectWithValue})=>{
      try{
        const response = await api.getMessages(userId);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const hasNoUnreadMessages = createAsyncThunk(
  "message/hasNoUnreadMessages",
  
  async(_, {rejectWithValue})=>{
      try{
        const response = await api.hasNoUnreadMessages();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getMessagesUsers = createAsyncThunk(
  "message/getMessagesUsers",
  
  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getMessagesUsers();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

const messageSlice = createSlice({
  name: "message",
  initialState: {
    messages: [],
    error: "",
    loading: false,
    share: [],
    messagesusers: [],
    loadingmessageusers: false,
    loadingmessages: false,
    hasnounreadmessages: false,
  },

  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(sendMessageMedia.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessageMedia.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(sendMessageMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      .addCase(getMessages.pending, (state) => {
        state.loadingmessages = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.loadingmessages = false;
        state.messages = action.payload;
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.loadingmessages = false;
        state.error = action.payload;
      })
      .addCase(getMessagesUsers.pending, (state) => {
        state.loadingmessageusers = true;
      })
      .addCase(getMessagesUsers.fulfilled, (state, action) => {
        state.loadingmessageusers = false;
        state.messagesusers = action.payload;
      })
      .addCase(getMessagesUsers.rejected, (state, action) => {
        state.loadingmessageusers = false;
        state.error = action.payload;
      })
      .addCase(hasNoUnreadMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(hasNoUnreadMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.hasnounreadmessages = action.payload;
      })
      .addCase(hasNoUnreadMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default messageSlice.reducer;
