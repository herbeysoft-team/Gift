import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";


export const getCategories = createAsyncThunk(
  "item/getCategories",

  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getCategories();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
      try{
        const response = await api.createItem(formData);
        if(response){
          toast.success(response.data.message);
          navigate("/home/shop");
        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getItems = createAsyncThunk(
  "item/getItems",

  async(_, {rejectWithValue})=>{
      try{
        const response = await api.getItems();
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getItem = createAsyncThunk(
  "item/getItem",

  async(id, {rejectWithValue})=>{
      try{
        const response = await api.getItem(id);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getItemsByCategory = createAsyncThunk(
  "item/getItemsByCategory",

  async(newValue, {rejectWithValue})=>{
      try{
        const response = await api.getItemsByCategory(newValue);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getItemsBySubCategory = createAsyncThunk(
  "item/getItemsBySubCategory",

  async(newValue, {rejectWithValue})=>{
      try{
        const response = await api.getItemsBySubCategory(newValue);
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

export const getItemsBySearch = createAsyncThunk(
  "item/getItemsBySearch",

  async(searchName, {rejectWithValue})=>{
      try{
        const response = await api.getItemsBySearch(searchName);
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
    item_categories: [],
    items: [],
    item: null,
    error: "",
    loading: false,
    loadingItems:false,
    loadingItem: false,
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.item_categories = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      })
      .addCase(getItems.pending, (state) => {
        state.loadingItems = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loadingItems = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loadingItems = false;
        state.error = action.payload;
      })
      .addCase(getItem.pending, (state) => {
        state.loadingItem = true;
      })
      .addCase(getItem.fulfilled, (state, action) => {
        state.loadingItem = false;
        state.item = action.payload;
      })
      .addCase(getItem.rejected, (state, action) => {
        state.loadingItem = false;
        state.error = action.payload;
      })
      .addCase(getItemsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItemsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getItemsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getItemsBySubCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItemsBySubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getItemsBySubCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getItemsBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(getItemsBySearch.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getItemsBySearch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
  },
});
export const { clearItems } = itemSlice.actions;
export default itemSlice.reducer;
