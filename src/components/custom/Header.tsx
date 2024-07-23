import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/auth/useLogin";
import { useLogout } from "../../hooks/auth/useLogout";
import { useAuthState } from "../../hooks/auth/useAuthState";

export function Header() {
  const { user: loginUser, status } = useAuthState();

  const login = useLogin();
  const logout = useLogout();

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50 p-3 flex justify-between items-center px-5">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>
      {status !== "loading" && (
        <div>
          {loginUser ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:shadow-md transition-shadow duration-300">
                  <AvatarImage
                    src={loginUser.photoURL ?? ""}
                    alt="User avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{loginUser.displayName}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuLabel>機能メニュー</DropdownMenuLabel>
                  <DropdownMenuItem>
                    <Link to={`/plan-recipe`} className="cursor-pointer">
                      <span>献立を作成</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      to={`/user/${loginUser?.uid}/recipe`}
                      className="cursor-pointer"
                    >
                      <span>過去提案された内容を見る</span>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4 text-red-500" />
                  <span className="text-red-500">Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={login}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Sign In
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
