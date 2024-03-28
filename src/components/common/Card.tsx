import React from "react";

export default function Card({ className, children }: any) {
  return (
    <div
      className={`p-5 bg-white shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] rounded-xl ${className}`}
    >
      {children}
    </div>
  );
}
