import { useState } from "react";

import LoginRegisterModal from "@/components/LoginRegisterModal";
import HeaderMobileMenu from "@/components/HeaderMobileMenu";

import { BRAND_NAME } from "@/utils/constants/constants";

const Header = () => {
  const [showHeaderAction] = useState(false);

  return (
    <header className="h-16 flex justify-between items-center px-10 fixed inset-0 z-50">
      <h1 className="font-extrabold text-xl uppercase">{BRAND_NAME}</h1>
      {showHeaderAction && (
        <>
          <div className="hidden lg:flex gap-2">
            <LoginRegisterModal type="register" />
            <LoginRegisterModal type="login" />
          </div>
          <div className="flex flex-col lg:hidden">
            <HeaderMobileMenu />
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
