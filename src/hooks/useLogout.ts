import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";
import { User } from "firebase/auth";
import { useSWRAuthStateRevalidate } from "./useSWRAuthState";

// データ取得関数
export const authFetcher = async (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      resolve(user);
      unsubscribe();
    });
  });
};

export function useLogout() {
  const revalidate = useSWRAuthStateRevalidate();

  // ログアウト処理
  const logout = async () => {
    try {
      await signOut(auth);

      // 認証情報の再取得
      await revalidate(null);
    } catch {
      toast("ログアウトエラー");
    }
  };

  return logout;
}
