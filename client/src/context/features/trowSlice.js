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

export const createTrow = createAsyncThunk(
  "trow/createTrow",

  async({formData, navigate, toast}, {rejectWithValue})=>{
      try{
        const response = await api.createTrow(formData);
        if(response){
          toast.success(response.data.message);
          navigate("/home/");

        }
        return response.data;
      }catch(err){
        return rejectWithValue(err.response.data)
      }
  }
)

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
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTrow.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTrow.fulfilled, (state, action) => {
        state.loading = false;
        localStorage.removeItem("trowDetails");
      })
      .addCase(createTrow.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      
      
   },
});
// export const { setUsername, setPhoneNo } = trowSlice.actions;
export default trowSlice.reducer;
