import { Link } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Menu } from "./Menu";

export function Header() {
  return (
    <header className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white p-3 px-5 shadow-md">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>
      <Suspense fallback={<Loader />}>
        <Menu />
      </Suspense>
    </header>
  );
}
