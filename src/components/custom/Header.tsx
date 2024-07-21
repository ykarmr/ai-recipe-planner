import { LogOut } from "lucide-react";
import { useAuthContext } from "../provider/AuthContextProvider";
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
import { Link, useNavigate } from "react-router-dom";

import { ModeToggle } from "./ModeToggle";

export function Header() {
  const navigate = useNavigate();
  const { login, logout, loginUser } = useAuthContext();

  return (
    <header className="p-3 flex justify-between items-center px-5">
      <Link to="/">
        <img src="/logo.svg" alt="Logo" />
      </Link>
      <div>
        {loginUser ? (
          <div className="flex items-center gap-3">
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={loginUser.photoURL ?? ""}
                    alt="User avatar"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>{loginUser.email}</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => navigate(`/user/${loginUser?.uid}/recipe`)}
                >
                  <span>過去提案された内容を見る</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button onClick={login}>Sign In</Button>
        )}
      </div>
    </header>
  );
}
