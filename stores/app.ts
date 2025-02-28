// features/counterSlice.ts
import { Friend } from "@/data";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const loadUserFromStorage = (): Friend | null => {
  if (typeof window === "undefined") return null;

  try {
    const localUser = localStorage.getItem("st_user");
    return localUser ? JSON.parse(localUser) : null;
  } catch (error) {
    console.error("LocalStorage okuma hatası:", error);
    return null;
  }
};

export interface AppStoreProps {
  value: number;
  st_user: null | Friend;
}

const initialState: AppStoreProps = {
  value: 0,
  st_user: loadUserFromStorage(),
};

const AppStore = createSlice({
  name: "AppStore",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    loginFront: (state, action: PayloadAction<string | JSON | Friend>) => {
      state.st_user = action.payload as Friend;
      console.log("User:", state.st_user);

      console.log("User:", state.st_user);
    },
    logoutFront: (state) => {
      state.st_user = null;
      if (typeof window !== "undefined") localStorage.removeItem("st_user");
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  loginFront,
  logoutFront,
} = AppStore.actions;
export default AppStore.reducer;
