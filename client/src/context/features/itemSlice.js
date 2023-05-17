import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const getSubcategories = createAsyncThunk(
  "item/getSubcategories",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getSubcategories();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const createItem = createAsyncThunk(
  "item/createItem",

  async({formData, navigate, toast}, {rejectWithValue})=>{
    console.log(formData)
      try{
        const response = await api.createItem(formData);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)


const itemSlice = createSlice({
  name: "item",
  initialState: {
    item_subcategories: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.item_subcategories = action.payload;
      })
      .addCase(getSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});

export default itemSlice.reducer;
