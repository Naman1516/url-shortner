import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
            ? "-top-3 text-sm px-2 text-primary bg-background"
            : "top-1/2 -translate-y-1/2 text-base "
        } ${
          isFocused && "bg-background"
        } transition-all ease-in-out left-3 font-normal`}
      >
        {label}
      </Label>
      <Input
        type={type}
        id={id}
        onChange={(event) => setValue(event.target.value)}
        className="w-full h-12 md:h-14 text-base focus:border-primary"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

export default LoginRegisterFormInput;
