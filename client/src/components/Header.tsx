import { BRAND_NAME } from "@/utils/constants/constants";
import LoginRegisterModal from "./LoginRegisterModal";
import HeaderMobileMenu from "./HeaderMobileMenu";

const Header = () => {
  return (
    <header className="bg-transparent h-16 flex justify-between items-center px-10 fixed inset-0 text-white z-50">
      <h1 className="font-extrabold bg-gradient-to-r from-[#eb568e] to-[#144ee3] text-transparent bg-clip-text uppercase">
        {BRAND_NAME}
      </h1>
      <div className="hidden md:flex gap-4">
        <LoginRegisterModal type="login" />
        <LoginRegisterModal type="register" />
      </div>
      <div className="flex flex-col lg:hidden">
        <HeaderMobileMenu />
      </div>
    </header>
  );
};

export default Header;
