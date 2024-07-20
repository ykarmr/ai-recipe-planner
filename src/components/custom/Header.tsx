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
import { Link } from "react-router-dom";

import { ModeToggle } from "./ModeToggle";

function Header() {
  const { login, logout, loginUser } = useAuthContext();

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <Link to="/">
        <img src="/logo.svg" alt="" />
      </Link>
      <div>
        {loginUser ? (
          <div className="flex items-center gap-3">
            <Button variant="outline">
              <Link to={`/user/${loginUser?.uid}/recipe`}>
                過去提案された内容を見る
              </Link>
            </Button>
            <ModeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src={loginUser.photoURL ?? ""} alt="@shadcn" />
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
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span onClick={logout}>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Button onClick={login}>Sign In</Button>
        )}
      </div>
    </div>
  );
}

export default Header;
