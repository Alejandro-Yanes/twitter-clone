import React from "react";

type ButtonProps = {
  label: string;
  secondary?: boolean;
  fullWidth?: boolean;
  large?: boolean;
  onClick: () => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  medium?: boolean;
  primary?: boolean;
  terciary?: boolean;
  danger?: boolean;
  dangerOutlined?: boolean;
};

const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  secondary,
  fullWidth,
  large,
  onClick,
  disabled,
  outline,
  small,
  medium,
  primary,
  terciary,
  danger,
  dangerOutlined,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-full font-semibold hover:opacity-80 transition 
                ${fullWidth ? "w-full" : "w-fit"}
                ${medium ? "text-md" : ""}
                ${small ? "text-xs" : ""}
                ${large ? "text-xl" : ""}
                ${large ? "px-5" : "px-4"}
                ${large ? "py-3" : "py-2"}
                ${outline ? "border" : ""}
                ${primary ? "text-white bg-transparent border-white" : ""}
                ${secondary ? "bg-sky-500 text-white" : ""}
                ${terciary ? "text-black bg-white" : ""}
                ${danger ? "text-white bg-red-500" : ""}
                ${
                  dangerOutlined
                    ? "text-red-500 border-red-500 bg-transparent"
                    : ""
                }
                `}
    >
      {label}
    </button>
  );
};

export default Button;
