import React from "react";

type ButtonProps = {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition 
                ${fullWidth ? "w-full" : "w-fit"}
                ${secondary ? "bg-white" : "bg-sky-500"}
                ${secondary ? "text-black" : "text-white"}
                ${secondary ? "border-black" : "border-ski-500"}
                ${large ? "text-xl" : "text-md"}
                ${large ? "px-5" : "px-4"}
                ${large ? "py-3" : "py-2"}
                ${outline ? "bg-transparent" : ""}
                ${outline ? "border-white" : ""}
                ${outline ? "text-white" : ""}}
                ${outline ? "border-2" : ""}`}
    >
      {label}
    </button>
  );
};

export default Button;
