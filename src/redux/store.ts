import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import { authApi } from './features/auth/authApi'
import { userApi } from './features/user/userApi'
import authReducer from './features/auth/authSlice'
import userReducer from './features/user/userSlice'
import { persistReducer, persistStore } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { productApi } from './features/product/productApi'
import { reviewApi } from './features/review/reviewApi'
import { imageUploadApi } from './features/image-upload/imageUploadApi'
import { orderApi } from './features/order/orderApi'
import { addressApi } from './features/address/addressApi'

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
  [authApi.reducerPath]: authApi.reducer, // API slice remains outside of persistence
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer, // API slice remains outside of persistence
  [reviewApi.reducerPath]: reviewApi.reducer,
  [imageUploadApi.reducerPath]: imageUploadApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer
});

const persistConfig = {
  key: "root", // Key for storage
  storage, // Storage engine (localStorage)
  whitelist: ["auth", "cart"], // Only persist these reducers
};

// Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }).concat(authApi.middleware, userApi.middleware, productApi.middleware, reviewApi.middleware, imageUploadApi.middleware, orderApi.middleware, addressApi.middleware),
})

export const persistor = persistStore(store); // Create persistor

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch 
