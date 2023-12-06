import { useState } from "react";
import { Button } from "./ui/button";
import LoginRegisterFormInput from "./LoginRegisterFormInput";

type Props = {
  type: "login" | "register";
  className?: string;
};

const LoginRegisterForm = ({ type, className }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <form className={`flex flex-col gap-y-4 ${className}`}>
      {type === "register" && (
        <>
          <LoginRegisterFormInput
            type="text"
            id="firstName"
            label="First Name"
            value={firstName}
            setValue={setFirstName}
          />
          <LoginRegisterFormInput
            type="text"
            id="lastName"
            label="Last Name"
            value={lastName}
            setValue={setLastName}
          />
        </>
      )}
      <LoginRegisterFormInput
        type="email"
        id="email"
        label="Email"
        value={email}
        setValue={setEmail}
      />
      <LoginRegisterFormInput
        type="password"
        id="password"
        label="Password"
        value={password}
        setValue={setPassword}
      />
      {type === "register" && (
        <LoginRegisterFormInput
          type="password"
          id="confirmPassword"
          label="Confirm Password"
          value={confirmPassword}
          setValue={setConfirmPassword}
        />
      )}

      <Button type="submit">{type === "login" ? "Login" : "Register"}</Button>
    </form>
  );
};

export default LoginRegisterForm;
