import { auth, db, provider } from "@/lib/firebase";
import { signInWithPopup, signOut, User } from "firebase/auth";
import { setDoc, doc, getDoc } from "firebase/firestore";
import {
  useState,
  useEffect,
  useContext,
  ReactNode,
  createContext,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type AuthContextType = {
  isReady: boolean;
  loginUser: User | null;
  login: VoidFunction;
  logout: VoidFunction;
};
// Context生成(ログインに関する情報を管理)
const AuthContext = createContext<AuthContextType>({
  isReady: false,
  loginUser: null,
  login: () => {},
  logout: () => {},
});

type Props = {
  children: ReactNode;
};

// AuthContextProvider (Provider)
export const AuthContextProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  // ログインユーザ
  const [loginUser, setLoginUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  // 起動時ログイン処理(既にログインしてる場合, ユーザ設定)
  useEffect(() => {
    try {
      // auth 初期化時にログインユーザ設定
      auth.onAuthStateChanged(async (user) => {
        if (user) {
          setLoginUser(user);
          setIsReady(true);
        } else {
          setIsReady(true);
        }
      });
    } catch {
      toast("ログイン情報取得時にエラーが発生しました");
    }
  }, []);

  // ログイン処理
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

      // 認証結果より user 設定
      setLoginUser(user);
      navigate("/plan-recipe");
    } catch (e) {
      toast("ログインエラー");
    }
  };

  // ログアウト処理
  const logout = async () => {
    try {
      await signOut(auth);
      setLoginUser(null);
    } catch {
      toast("ログアウトエラー");
    }
  };

  // ログイン情報設定したProvider
  return (
    <AuthContext.Provider
      value={{
        loginUser,
        login,
        logout,
        isReady,
      }}
    >
      {isReady ? children : null}
    </AuthContext.Provider>
  );
};

// AuthContextConsumer (useContext) # Provider で囲った範囲で使う必要あり
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};
