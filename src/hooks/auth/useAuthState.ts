import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { useSyncExternalStore } from "react";

export type AuthState = {
  status: "loading" | "login" | "logout";
  user: User | null;
};

const initialState: AuthState = { status: "loading", user: null };

let state: AuthState = initialState;

const getSnapshot = () => {
  return state;
};

const subscribe = (callback: () => void) => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      state = {
        status: "login",
        user: user,
      };
    } else {
      state = {
        status: "logout",
        user: null,
      };
    }

    callback();
  });

  return () => {
    unsubscribe();
  };
};

export function useAuthState() {
  const store = useSyncExternalStore(subscribe, getSnapshot);
  return store;
}
