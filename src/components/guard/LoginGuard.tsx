import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "../../hooks/auth/useAuthState";

export function LoginGuard({ children }: { children: ReactNode }) {
  const { user: loginUser, status } = useAuthState();

  const navigate = useNavigate();

  useEffect(() => {
    if (status !== "loading" && !loginUser) {
      navigate("/not-login");
    }
  }, [loginUser, navigate, status]);

  return children;
}
