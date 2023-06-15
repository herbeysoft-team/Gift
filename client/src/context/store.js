import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import UserReducer from "./features/userSlice";
import RelationshipReducer from "./features/relationshipSlice";
import ItemReducer from "./features/itemSlice";
import TrowReducer from "./features/trowSlice";
import WishlistReducer from "./features/wishlistSlice";
import PostReducer from "./features/postSlice";
import CommentReducer from "./features/commentSlice";
import LikeReducer from "./features/likeSlice";

export default configureStore({
    reducer: {
      auth: AuthReducer,
      user: UserReducer,
      relationship: RelationshipReducer,
      item: ItemReducer,
      trow: TrowReducer,
      wishlist: WishlistReducer,
      post: PostReducer,
      comment: CommentReducer,
      like: LikeReducer,
    }
  });
  