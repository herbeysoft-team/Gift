import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

// export const getSubcategories = createAsyncThunk(
//   "item/getSubcategories",

//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.getSubcategories();
//       return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

// export const createItem = createAsyncThunk(
//   "item/createItem",

//   async({formData, navigate, toast}, {rejectWithValue})=>{
//       try{
//         const response = await api.createItem(formData);
//         if(response){
//           toast.success(response.data.message);
//           navigate("/home/shop");
//         }
//         return response.data;
//       }catch(err){
//         return rejectWithValue(err.response.data)
//       }
//   }
// )

// export const getItems = createAsyncThunk(
//   "item/getItems",

//   async(_, {rejectWithValue})=>{
//       try{
//         const response = await api.getItems();
//         return response.data;
//       }catch(err){
//         return rejectWithValue(err.response.data)
//       }
//   }
// )

// export const getItemsByCategory = createAsyncThunk(
//   "item/getItemsByCategory",

//   async(newValue, {rejectWithValue})=>{
//       try{
//         const response = await api.getItemsByCategory(newValue);
//         return response.data;
//       }catch(err){
//         return rejectWithValue(err.response.data)
//       }
//   }
// )

// export const getItemsBySearch = createAsyncThunk(
//   "item/getItemsBySearch",

//   async(searchName, {rejectWithValue})=>{
//       try{
//         const response = await api.getItemsBySearch(searchName);
//         return response.data;
//       }catch(err){
//         return rejectWithValue(err.response.data)
//       }
//   }
// )


const trowSlice = createSlice({
  name: "trow",
  initialState: {
    username: null,
    phone_no: null,
    error: "",
    loading: false,
  },
  reducers: {
    setUsername: (state, action) => {
        console.log(action.payload)
        state.username = action.payload;
        console.log(state.username)
      },
      setPhoneNo: (state, action) => {
        state.phone_no = action.payload;
      },
  },
  extraReducers: (builder) => {
//     builder
//       .addCase(getSubcategories.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getSubcategories.fulfilled, (state, action) => {
//         state.loading = false;
//         state.item_subcategories = action.payload;
//       })
//       .addCase(getSubcategories.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(createItem.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createItem.fulfilled, (state, action) => {
//         state.loading = false;
//       })
//       .addCase(createItem.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getItems.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getItems.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(getItems.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getItemsByCategory.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getItemsByCategory.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(getItemsByCategory.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(getItemsBySearch.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(getItemsBySearch.fulfilled, (state, action) => {
//         state.loading = false;
//         state.items = action.payload;
//       })
//       .addCase(getItemsBySearch.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
      
   },
});
export const { setUsername, setPhoneNo } = trowSlice.actions;
export default trowSlice.reducer;
