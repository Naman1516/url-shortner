import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {
  id: string;
  type: "email" | "text" | "password";
  label: string;
  value: string;
  setValue: (value: string) => void;
};

const LoginRegisterFormInput = ({
  id,
  type,
  label,
  value,
  setValue,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <Label
        htmlFor={id}
        className={`absolute ${
          isFocused || value
            ? "-top-3 text-sm px-2 bg-white text-primary"
            : "top-1/2 -translate-y-1/2 text-base "
        } ${
          isFocused ? "text-primary" : "text-neutral-600"
        } transition-all ease-in-out left-3 font-normal rounded-md`}
      >
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        onChange={(event) => setValue(event.target.value)}
        className="w-full h-10 rounded-md text-base border-neutral-600 focus:border-primary"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default LoginRegisterFormInput;
