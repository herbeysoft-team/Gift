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

  async ({userId, toast}, { rejectWithValue }) => {
    try {
      const response = await api.deleteRelationship(userId);
      if(response){
        toast.success("Unfollow...")
      }

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

export const checkRelationship = createAsyncThunk(
  "relationship/checkRelationship",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.checkRelationship(userId);

      return response.data.followed;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const checkMutualRelationship = createAsyncThunk(
  "relationship/checkMutualRelationship",

  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.checkMutualRelationship(userId);

      return response.data.mutual_relationship;
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
    checkFollow: null,
    checkMutualFollow: null,
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
      })
      .addCase(checkRelationship.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkRelationship.fulfilled, (state, action) => {
        state.loading = false;
        state.checkFollow = action.payload;
      })
      .addCase(checkRelationship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(checkMutualRelationship.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkMutualRelationship.fulfilled, (state, action) => {
        state.loading = false;
        state.checkMutualFollow = action.payload;
      })
      .addCase(checkMutualRelationship.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default relationshipSlice.reducer;
