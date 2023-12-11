import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import LoginRegisterFormInput from "@/components/LoginRegisterFormInput";

import { LogIn } from "lucide-react";


type Props = {
  type: "login" | "register";
  isSideMenu?: boolean;
};

const LoginRegisterModal = ({ type, isSideMenu }: Props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <Dialog>
      {!isSideMenu && (
        <DialogTrigger asChild>
          {type === "login" ? (
            <Button className="px-8 py-4 border h-12 text-sm font-bold">
              Login <LogIn size={16} />
            </Button>
          ) : (
            <Button variant={"outline"} className="px-8 py-4 h-12 text-sm font-bold">
              Register Now
            </Button>
          )}
        </DialogTrigger>
      )}
      {isSideMenu && (
        <DialogTrigger asChild>
          {type === "login" ? (
            <Button className="w-full">Login</Button>
          ) : (
            <Button className="w-full">Register</Button>
          )}
        </DialogTrigger>
      )}
      <form>
        <DialogContent className="w-10/12 flex flex-col gap-y-6 rounded-md dark:text-white">
          <DialogHeader>
            <DialogTitle className=" text-center my-2 text-xl md:text-2xl">
              {type === "login" ? "Welcome back!" : "Create your account!"}
            </DialogTitle>
          </DialogHeader>
          <div className="my-2 flex flex-col gap-6">
            {type === "register" && (
              <>
                <LoginRegisterFormInput
                  type="text"
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  setValue={(value) =>
                    setFormData({ ...formData, firstName: value })
                  }
                />
                <LoginRegisterFormInput
                  type="text"
                  id="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  setValue={(value) =>
                    setFormData({ ...formData, lastName: value })
                  }
                />
              </>
            )}
            <LoginRegisterFormInput
              type="email"
              id="email"
              label="Email"
              value={formData.email}
              setValue={(value) => setFormData({ ...formData, email: value })}
            />
            <LoginRegisterFormInput
              type="password"
              id="password"
              label="Password"
              value={formData.password}
              setValue={(value) =>
                setFormData({ ...formData, password: value })
              }
            />
            {type === "register" && (
              <LoginRegisterFormInput
                type="password"
                id="confirmPassword"
                label="Confirm Password"
                value={formData.confirmPassword}
                setValue={(value) =>
                  setFormData({ ...formData, confirmPassword: value })
                }
              />
            )}
          </div>
          <DialogFooter>
            <Button type="submit" className="w-full h-12 md:h-14">
              {type === "login" ? "Login" : "Register"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default LoginRegisterModal;
