import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { authApi } from "./services/auth";
import { userApi } from "./services/user";
import { problemApi } from "./services/problem";
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [problemApi.reducerPath]: problemApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(problemApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export { store };
