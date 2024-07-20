import { ReactNode, useEffect } from "react";
import { useAuthContext } from "../provider/AuthContextProvider";
import { useNavigate } from "react-router-dom";

function LoginGuard({ children }: { children: ReactNode }) {
  const { loginUser, isReady } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (isReady && !loginUser) {
      navigate("/not-login");
    }
  }, [isReady, loginUser, navigate]);

  return children;
}

export default LoginGuard;
