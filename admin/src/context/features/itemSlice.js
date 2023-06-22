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

export const updateItem= createAsyncThunk(
  "item/updateItem",

  async ({ updatedValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateItem(updatedValue);

      if(response){
        toast.success(response.data.message)
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateSubCat= createAsyncThunk(
  "item/updateSubCat",

  async ({ updatedValue, toast }, { rejectWithValue }) => {
    try {
      const response = await api.updateSubCat(updatedValue);

      if(response){
        toast.success(response.data.message)
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

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
    item_categories: [],
    item_subcategories: [],
    items: [],
    error: "",
    loadingitems: false,
    loadingcategories: false,
    loadingsubcategories: false,
    loadingupdateitem: false,
    successupdateitem: false,
    loadingupdatesubcat: false,
    successupdatesubcat: false,
  },
  reducers: {
    clearItems: (state) => {
      state.items = [];
    },
    setSuccessUpdateItem: (state, action) => {
      state.successupdateitem = false;
      state.loadingupdateitem = false;
    },
    setSuccessUpdateSubCat: (state, action) => {
      state.successupdatesubcat = false;
      state.loadingupdatesubcat = false;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getCategories.pending, (state) => {
      state.loadingcategories = true;
    })
    .addCase(getCategories.fulfilled, (state, action) => {
      state.loadingcategories = false;
      state.item_categories = action.payload;
    })
    .addCase(getCategories.rejected, (state, action) => {
      state.loadingcategories = false;
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
        state.loading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.loading = false;
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
      })
      .addCase(updateItem.pending, (state) => {
        state.loadingupdateitem = true;
        state.successupdateitem = false;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.loadingupdateitem = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.items = state.items.map((item) =>
            item.id === id ? action.payload : item
          );
        }
        state.successupdateitem = true;
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.loadingupdateitem= false;
        state.error = action.payload;
        
      })
      .addCase(updateSubCat.pending, (state) => {
        state.loadingupdatesubcat = true;
        state.successupdatesubcat = false;
      })
      .addCase(updateSubCat.fulfilled, (state, action) => {
        state.loadingupdatesubcat = false;
        const {
          arg: { id },
        } = action.meta;
        if (id) {
          state.item_subcategories = state.item_subcategories.map((item) =>
            item.id === id ? action.payload : item
          );
        }
        state.successupdatesubcat = true;
      })
      .addCase(updateSubCat.rejected, (state, action) => {
        state.loadingupdatesubcat= false;
        state.error = action.payload;
        
      })
      
  },
});
export const { setSuccessUpdateItem, setSuccessUpdateSubCat, clearItems } = itemSlice.actions;
export default itemSlice.reducer;
