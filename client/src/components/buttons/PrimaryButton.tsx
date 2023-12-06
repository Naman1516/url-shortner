import React, { FormEvent, useCallback } from "react";
import { Button } from "@/components/ui/button";

type PrimaryButtonProps = {
  callback: (event: FormEvent) => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
};

const PrimaryButton = (props: PrimaryButtonProps) => {
  const { callback, type, disabled, className } = props;

  const callbackFn = useCallback(
    (event: FormEvent) => {
      callback(event);
    },
    [callback]
  );

  return (
    <Button
      type={type}
      className={`right-2 rounded-full py-6 px-10 bg-primary border-primary font-bold text-sm disabled:bg-blue-500 disabled:cursor-not-allowed ${className}`}
      disabled={disabled}
      onClick={callbackFn}
    >
      {props.children}
    </Button>
  );
};

export default PrimaryButton;
