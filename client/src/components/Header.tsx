import { BRAND_NAME } from "@/utils/constants/constants";
import LoginRegisterModal from "./LoginRegisterModal";
import HeaderMobileMenu from "./HeaderMobileMenu";

const Header = () => {
  return (
    <header className="h-16 flex justify-between items-center px-10 fixed inset-0 z-50">
      <h1 className="font-extrabold text-xl uppercase">{BRAND_NAME}</h1>
      <div className="hidden lg:flex gap-2">
        <LoginRegisterModal type="register" />
        <LoginRegisterModal type="login" />
      </div>
      <div className="flex flex-col lg:hidden">
        <HeaderMobileMenu />
      </div>
    </header>
  );
};

export default Header;
