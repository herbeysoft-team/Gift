import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";
import RelationshipReducer from "./features/relationshipSlice";

export default configureStore({
    reducer: {
      auth: AuthReducer,
      user: UserReducer,
      relationship: RelationshipReducer,
    }
  });
  