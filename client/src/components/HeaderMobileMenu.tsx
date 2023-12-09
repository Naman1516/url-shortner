import { MenuIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginRegisterModal from "./LoginRegisterModal";

const HeaderMobileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="lg:hidden flex flex-col justify-between items-center mt-6 w-48 h-24">
        <LoginRegisterModal type="login" isSideMenu={true} />
        <LoginRegisterModal type="register" isSideMenu={true} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMobileMenu;
