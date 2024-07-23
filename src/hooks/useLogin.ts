import { auth, provider, db } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useSWRAuthStateRevalidate } from "./useSWRAuthState";

export function useLogin() {
  const navigate = useNavigate();
  const revalidate = useSWRAuthStateRevalidate();

  const login = async () => {
    try {
      // Google ログインのポップアップ表示して認証結果取得
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        // Firestoreにユーザー情報を保存
        await setDoc(doc(db, "users", user.uid), {
          uid: result.user.uid,
          email: result.user.email,
          createdAt: new Date(),
        });
      }

      // 認証情報の再取得
      await revalidate(user);
      navigate("/plan-recipe");
    } catch (e) {
      toast("ログインエラー");
    }
  };

  return login;
}
