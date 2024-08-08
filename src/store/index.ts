import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./services/auth";
import { userApi } from "./services/user";
import { problemApi } from "./services/problem";
import workspaceSlice from "./slices/workspaceSlice";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [problemApi.reducerPath]: problemApi.reducer,
    workspace: workspaceSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(problemApi.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export { store };
