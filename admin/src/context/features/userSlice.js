import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const allcountfordashboard = createAsyncThunk(
    "user/allcountfordashboard",
    async (_, { rejectWithValue }) => {
        
        try {
        const response = await api.allcountfordashboard();    
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response.data);
      }
    }
  );
  
//   export const register = createAsyncThunk(
//     "auth/register",
//     async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//       try {
//         const response = await api.register(formValue);
//         toast.success("User Created Successfully");
//         navigate("/");
//         return response.data;
//       } catch (err) {
//         toast.error(err.response.data.message);
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );


const userSlice = createSlice({
    name: "user",
    initialState: {
      allcount: [],
      error: "",
      loading: false,
    },
    reducers: {
      
    },
    extraReducers: (builder) => {
      builder
        .addCase(allcountfordashboard.pending, (state) => {
          state.loading = true;
        })
        .addCase(allcountfordashboard.fulfilled, (state, action) => {
          state.loading = false;
          state.allcount = action.payload;
        })
        .addCase(allcountfordashboard.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
     },
    
  });
  
 
  export default userSlice.reducer;