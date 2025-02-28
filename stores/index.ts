// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import AppStore from "./app"; // Adjust the import path as necessary

export const store = configureStore({
  reducer: {
    AppStore,
  },
});

// RootState ve AppDispatch türlerini çıkarıyoruz
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Özel hook'lar
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
