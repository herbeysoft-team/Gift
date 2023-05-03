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

export const getUnfollowUsers = createAsyncThunk(
  "user/getUnfollowUsers",

  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getUnfollowUsers(id);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getSearchUsers = createAsyncThunk(
  "user/getSearchUsers",

  async (searchname, { rejectWithValue }) => {
    try {
      const response = await api.getSearchUsers(searchname);

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
    unfollowUsers: [],
    searchUsers: [],
    error: "",
    loading: false,
  },
  reducers: {},
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
      .addCase(getUnfollowUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUnfollowUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.unfollowUsers = action.payload;
      })
      .addCase(getUnfollowUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getSearchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSearchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.searchUsers = action.payload;
      })
      .addCase(getSearchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
