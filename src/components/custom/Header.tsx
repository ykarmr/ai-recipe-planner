import { Link } from "react-router-dom";
import { Suspense } from "react";
import { Loader } from "lucide-react";
import { Menu } from "./Menu";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-3 flex justify-between items-center px-5">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>
      <Suspense fallback={<Loader />}>
        <Menu />
      </Suspense>
    </header>
  );
}
