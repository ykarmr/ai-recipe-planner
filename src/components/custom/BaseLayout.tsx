import { ReactNode } from "react";
import { Header } from "./Header";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 sm:px-8 pt-16">
        {children}
      </main>
    </>
  );
}
