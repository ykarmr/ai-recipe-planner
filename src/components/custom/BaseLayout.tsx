import { ReactNode } from "react";
import { Header } from "./Header";

export function BaseLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 pt-16 sm:px-8">
        {children}
      </main>
    </>
  );
}
