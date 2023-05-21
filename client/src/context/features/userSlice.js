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

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",

  async ({ updatedValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateUserProfile(updatedValue);
      if(response){
        toast.success("Profile Updated Successfully")
      }
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

export const getUsersToGift = createAsyncThunk(
  "user/getUsersToGift",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getUsersToGift();

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const uploadProfilePic = createAsyncThunk(
  "user/uploadProfilePic",

  async ({formData, toast},{ rejectWithValue }) => {
    try {
      const response = await api.uploadProfilePic(formData);
      toast.success("Updated Successfully")
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
    usersToGift: [],
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
      })
      .addCase(getUsersToGift.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsersToGift.fulfilled, (state, action) => {
        state.loading = false;
        state.usersToGift = action.payload;
      })
      .addCase(getUsersToGift.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(uploadProfilePic.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadProfilePic.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(uploadProfilePic.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
