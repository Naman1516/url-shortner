import React, { FormEvent } from "react";

type PrimaryButtonProps = {
  callback: (event: FormEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { callback, type, disabled, className } = props;

  return (
    <button
      type={type || "button"}
      className={`absolute rounded-full primary-bg primary-border font-bold text-sm disabled:bg-blue-500 disabled:cursor-not-allowed w-[160px] flex justify-center items-center ${className}`}
      onClick={callback}
      disabled={disabled}
    >
      {props.children}
    </button>
  );
};

export default PrimaryButton;
