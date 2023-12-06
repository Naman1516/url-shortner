import { useAppDispatch } from "@/utils/store/appStore";
import { closeModal } from "@/utils/store/globalSlice";
import { Button } from "@/components/ui/button";
import LoginRegisterForm from "@/components/LoginRegisterForm";
import { X } from "lucide-react";

type Props = {
  type: "login" | "register";
};

const LoginRegisterModal = ({ type }: Props) => {
  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-0"></div>
      <section className="fixed inset-0 flex justify-center items-center z-10">
        <div className="border-2  max-w-screen-sm rounded-xl w-2/5 bg-white">
          <div className="flex flex-col justify-center items-center px-6">
            <div className="w-full text-center relative flex items-center justify-center">
              <Button
                className="absolute right-0 rounded-full bg-transparent text-neutral-500 hover:text-white"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </Button>
              <h3 className="p-4 font-semibold text-lg">
                {type === "login" ? "Welcome back" : "Create your account"}
              </h3>
            </div>
            <LoginRegisterForm type={type} className="w-full m-4" />
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginRegisterModal;
