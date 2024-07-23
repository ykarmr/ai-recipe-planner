import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { toast } from "sonner";

export function useLogout() {
  // ログアウト処理
  const logout = async () => {
    try {
      await signOut(auth);
    } catch {
      toast("ログアウトエラー");
    }
  };

  return logout;
}
