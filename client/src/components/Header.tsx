import { BRAND_NAME } from "@/utils/constants";

const Header = () => {
  return (
    <header className="bg-transparent h-16 flex justify-between items-center px-10 fixed inset-0 text-white">
      <h1 className="font-extrabold bg-gradient-to-r from-[#eb568e] to-[#144ee3] text-transparent bg-clip-text uppercase">
        {BRAND_NAME}
      </h1>
      {/* <div className="flex gap-10">
        <button>Login</button>
        <button>Register Now</button>
      </div> */}
    </header>
  );
};

export default Header;
