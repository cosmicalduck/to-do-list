import { configureStore } from "@reduxjs/toolkit";
import { ActivitySlice } from "./features/activitySlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { SortSlice } from "./features/sortSlice";

export const store = configureStore({
  reducer: {
    activity: ActivitySlice.reducer,
    sort: SortSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
