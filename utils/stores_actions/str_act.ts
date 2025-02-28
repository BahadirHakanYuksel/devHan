import { store } from "@/stores";
import { loginFront, logoutFront } from "@/stores/app";

export const st_loginFront = (userData: string | JSON) => {
  store.dispatch(loginFront(userData));
};

export const st_logoutFront = () => {
  store.dispatch(logoutFront());
};
