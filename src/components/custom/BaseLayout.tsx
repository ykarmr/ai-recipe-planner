import { ReactNode } from "react";
import { Header } from "./Header";
import { AuthContextProvider } from "../provider/AuthContextProvider";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-16">
        {children}
      </main>
    </AuthContextProvider>
  );
}
