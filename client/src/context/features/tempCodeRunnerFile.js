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
          localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
          state.user = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(register.pending, (state) => {
          state.loading = true;
        })
        .addCase(register.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(register.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        .addCase(resendOTP.pending, (state) => {
          state.loading = true;
        })
        .addCase(resendOTP.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        .addCase(verify.pending, (state) => {
          state.loading = true;
        })
        .addCase(verify.fulfilled, (state, action) => {
          state.loading = false;
          localStorage.removeItem("profile");
          state.user = null;
        })
        .addCase(verify.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(resetPasswordOTP.pending, (state) => {
          state.loading = true;
        })
        .addCase(resetPasswordOTP.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(resetPassword.pending, (state) => {
          state.loading = true;
        })
        .addCase(resetPassword.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
    
  });
  
  export const { setUser, setLogout } = authSlice.actions;
  export default authSlice.reducer;