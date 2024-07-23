import { auth } from "@/lib/firebase";
import { User } from "firebase/auth";
import useSWR, { useSWRConfig } from "swr";

// データ取得関数
const fetcher = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe();
    });
  });
};

const key = "global/auth";
export const useSWRAuthState = () => {
  const { data } = useSWR<User | null>(key, fetcher);
  return data;
};

// 認証情報再検証用のhooks
export const useSWRAuthStateRevalidate = () => {
  const { mutate } = useSWRConfig();
  const trigger = (user: User | null) => mutate<User | null>(key, user);
  return trigger;
};
