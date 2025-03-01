import { Friend } from "@/data";
import { store } from "@/stores";
import {
  loginFront,
  logoutFront,
  setStUsers,
  toggleAllFriendModal,
} from "@/stores/app";

export const st_loginFront = (userData: string | JSON) => {
  store.dispatch(loginFront(userData));
};

export const st_logoutFront = () => {
  store.dispatch(logoutFront());
};

export const st_toggleAllFriendModal = () => {
  store.dispatch(toggleAllFriendModal());
};

export const st_setStUsers = (users: Friend[]) => {
  store.dispatch(setStUsers(users));
};
