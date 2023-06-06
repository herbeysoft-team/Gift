import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const addWishlist = createAsyncThunk(
  "wishlist/addwishlist",

  async ({item_id, toast}, { rejectWithValue }) => {
    try {
      const response = await api.addWishlist(item_id);
      if(response){
        toast.success(response.data.message);
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeWishlist = createAsyncThunk(
    "wishlist/removewishlist",
  
    async ({item_id, toast}, { rejectWithValue }) => {
      try {
        const response = await api.removeWishlist(item_id);
        if(response){
          toast.success(response.data.message);
        }
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  
export const myWishlist = createAsyncThunk(
    "wishlist/mywishlist",
  
    async (_, { rejectWithValue }) => {
      try {
        const response = await api.myWishlist()
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );

  export const wishlists = createAsyncThunk(
    "wishlist/wishlists",
  
    async (userId, { rejectWithValue }) => {
      try {
        const response = await api.wishlists(userId)
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );




const itemSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishes:[],
    my_wishlist: [],
    error: "",
    loading: false,
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWishlist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(myWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(myWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.my_wishlist = action.payload;
      })
      .addCase(myWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(wishlists.pending, (state) => {
        state.loading = true;
      })
      .addCase(wishlists.fulfilled, (state, action) => {
        state.loading = false;
        state.wishes = action.payload;
      })
      .addCase(wishlists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
      
  },
});
export const { clearItems } = itemSlice.actions;
export default itemSlice.reducer;
