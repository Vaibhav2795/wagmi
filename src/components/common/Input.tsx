import React from "react";

export default function Input({
  placeholder,
  value,
  name,
  onChange,
}: {
  placeholder: string;
  value: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="bg-gray-100 p-2 w-full rounded-xl focus:outline-none"
      name={name}
      id={name}
      value={value}
      onChange={onChange}
    />
  );
}
