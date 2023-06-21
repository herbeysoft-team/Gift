import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";
import GiftReducer from "./features/giftSlice";
import TrowReducer from "./features/trowSlice";


export default configureStore({
    reducer: {
      auth: AuthReducer,
      user: UserReducer,
      gift: GiftReducer,
      trow: TrowReducer,
      
    }
  });
  