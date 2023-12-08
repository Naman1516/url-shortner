import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import LoginRegisterFormInput from "./LoginRegisterFormInput";

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
      <form>
        {!isSideMenu && (
          <DialogTrigger asChild>
            {type === "login" ? (
              <Button className="flex gap-2 px-8 py-4 rounded-full bg-[#181e29] border border-[#353c4a]">
                Login <LogIn size={16} />
              </Button>
            ) : (
              <Button className="flex gap-2 px-8 py-4 rounded-full">
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
        <DialogContent className="w-10/12 rounded-md">
          <DialogHeader>
            <DialogTitle className=" text-center">
              {type === "login" ? "Welcome back!" : "Create your account!"}
            </DialogTitle>
          </DialogHeader>
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
            setValue={(value) => setFormData({ ...formData, password: value })}
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

          <DialogFooter>
            <Button type="submit" className="w-full">
              {type === "login" ? "Login" : "Register"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default LoginRegisterModal;
