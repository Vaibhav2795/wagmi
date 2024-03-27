import React from "react";

type ButtonProps = {
  className?: string;
  onClick: () => void;
  label: string;
};

const Button: React.FC<ButtonProps> = ({ className, onClick, label }) => {
  return (
    <button
      className={`bg-indigo-400 text-white px-5 h-12 rounded-full w-48 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
