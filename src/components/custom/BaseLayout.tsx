import { ReactNode } from "react";
import Header from "./Header";
import { AuthContextProvider } from "../provider/AuthContextProvider";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <Header />
      {children}
    </AuthContextProvider>
  );
}
