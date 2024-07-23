import { Button } from "@/components/ui/button";
import { useLogin } from "@/hooks/useLogin";
import { useLogout } from "@/hooks/useLogout";
import { useSWRAuthState } from "@/hooks/useSWRAuthState";

import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const Menu = () => {
  const user = useSWRAuthState();
  const login = useLogin();
  const logout = useLogout();

  // ログインしていない場合はサインインボタンを表示
  if (!user) {
    return (
      <Button
        onClick={login}
        className="bg-blue-500 hover:bg-blue-600 text-white"
      >
        Sign In
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer hover:shadow-md transition-shadow duration-300">
          <AvatarImage src={user.photoURL ?? ""} alt="User avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.displayName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>機能メニュー</DropdownMenuLabel>
          <DropdownMenuItem>
            <Link to={`/plan-recipe`} className="cursor-pointer">
              <span>献立を作成</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to={`/user/${user?.uid}/recipe`} className="cursor-pointer">
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
  );
};
