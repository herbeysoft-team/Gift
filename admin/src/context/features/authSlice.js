import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
    "auth/login",
    async ({ formValue, navigate, toast }, { rejectWithValue }) => {
        
        try {
        const response = await api.login(formValue); 
        if(response){
            toast.success("Login Successfully");
            navigate("/home")
        }       
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

//   export const resendOTP = createAsyncThunk(
//     "auth/resendOTP",
//     async ({ formValue, toast }, { rejectWithValue }) => {
//       try {
//         const response = await api.resendOTP(formValue);
//         toast.success("OTP has been sent");
//         return response.data;
//       } catch (err) {
//         toast.error(err.response.data.message);
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );

//   export const verify = createAsyncThunk(
//     "auth/verify",
//     async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//       try {
//         const response = await api.verify(formValue);
//         toast.success("Account Verified. Please Login");
//         navigate("/")
//         return response.data;
//       } catch (err) {
//         toast.error(err.response.data.message);
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );

//   export const resetPasswordOTP = createAsyncThunk(
//     "auth/resetPasswordOTP",
//     async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//       try {
//         const response = await api.resetPasswordOTP(formValue);
//         toast.success("A new OTP has been sent to you!");
//         navigate("/changePassword")
//         return response.data;
//       } catch (err) {
//         toast.error(err.response.data.message);
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );

//   export const resetPassword = createAsyncThunk(
//     "auth/resetPassword",
//     async ({ formValue, navigate, toast }, { rejectWithValue }) => {
//       try {
//         const response = await api.resetPassword(formValue);
//         toast.success("Password changed successfully!");
//         navigate("/");
//         return response.data;
//       } catch (err) {
//         toast.error(err.response.data.message);
//         return rejectWithValue(err.response.data);
//       }
//     }
//   );


const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      error: "",
      loading: false,
    },
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      },
      setLogout: (state, action) => {
        localStorage.clear();
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          localStorage.setItem("trowadmin", JSON.stringify({ ...action.payload }));
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
//         .addCase(register.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(register.fulfilled, (state, action) => {
//           state.loading = false;
//           state.user = action.payload;
//         })
//         .addCase(register.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         })
//         .addCase(resendOTP.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(resendOTP.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload.message;
//         })
//         .addCase(verify.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(verify.fulfilled, (state, action) => {
//           state.loading = false;
//           localStorage.removeItem("profile");
//           state.user = null;
//         })
//         .addCase(verify.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         })
//         .addCase(resetPasswordOTP.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(resetPasswordOTP.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         })
//         .addCase(resetPassword.pending, (state) => {
//           state.loading = true;
//         })
//         .addCase(resetPassword.rejected, (state, action) => {
//           state.loading = false;
//           state.error = action.payload;
//         });
     },
    
  });
  
  export const { setUser, setLogout } = authSlice.actions;
  export default authSlice.reducer;