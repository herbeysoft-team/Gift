import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";
import GiftReducer from "./features/giftSlice";


export default configureStore({
    reducer: {
      auth: AuthReducer,
      user: UserReducer,
      gift: GiftReducer,
      
    }
  });
  