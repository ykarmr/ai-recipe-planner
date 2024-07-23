import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSWRAuthState } from "../../hooks/useSWRAuthState";

export function LoginGuard({ children }: { children: ReactNode }) {
  const user = useSWRAuthState();

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/not-login");
    }
  }, [navigate, user]);

  return children;
}
