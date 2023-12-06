import { BRAND_NAME } from "@/utils/constants/constants";
import { LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { setModalState } from "@/utils/store/globalSlice";
import { useAppDispatch } from "@/utils/store/appStore";

const Header = () => {
  const dispatch = useAppDispatch();
  const handleLoginRegisterClick = (type: "login" | "register") => {
    dispatch(setModalState({ isVisible: true, type }));
  };

  return (
    <header className="bg-transparent h-16 flex justify-between items-center px-10 fixed inset-0 text-white">
      <h1 className="font-extrabold bg-gradient-to-r from-[#eb568e] to-[#144ee3] text-transparent bg-clip-text uppercase">
        {BRAND_NAME}
      </h1>
      <div className="hidden md:flex gap-4">
        <Button
          className="flex gap-2 px-8 py-4 rounded-full bg-[#181e29] border border-[#353c4a]"
          onClick={() => handleLoginRegisterClick("login")}
        >
          Login <LogIn size={16} />
        </Button>
        <Button
          className="flex gap-2 px-8 py-4 rounded-full"
          onClick={() => handleLoginRegisterClick("register")}
        >
          Register Now
        </Button>
      </div>
    </header>
  );
};

export default Header;
