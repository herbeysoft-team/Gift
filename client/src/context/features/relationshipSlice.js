import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const addRelationship = createAsyncThunk(
  "relationship/addRelationship",

  async ({userId, toast}, { rejectWithValue }) => {
    try {
      const response = await api.addRelationship(userId);
        if(response){
            toast.success("Following...")
        }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const deleteRelationship = createAsyncThunk(
  "relationship/deleteRelationship",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.deleteRelationship(userId);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const countRelationship = createAsyncThunk(
  "relationship/countRelationship",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.countRelationship(userId);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
const relationshipSlice = createSlice({
  name: "relationship",
  initialState: {
    userProfile: null,
    countFollow: null,
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRelationship.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRelationship.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(addRelationship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteRelationship.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteRelationship.fulfilled, (state, action) => {
        state.loading = false;
        state.unfollowUsers = action.payload;
      })
      .addCase(deleteRelationship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(countRelationship.pending, (state) => {
        state.loading = true;
      })
      .addCase(countRelationship.fulfilled, (state, action) => {
        state.loading = false;
        state.countFollow = action.payload;
      })
      .addCase(countRelationship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default relationshipSlice.reducer;
