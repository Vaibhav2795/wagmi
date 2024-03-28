import React from "react";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";

import UseAccountHookComponent from "./UseAccountHookComponent";
import UseSwitchChainComponent from "./UseSwitchChainComponent";
import UseBalanceHookComponent from "./UseBalanceHookComponent";
import UseReadContractComponent from "./UseReadContractComponent";

export function Account() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className="max-w-4xl w-full">
        <UseAccountHookComponent />
        <UseBalanceHookComponent />
        <UseSwitchChainComponent />
        <UseReadContractComponent />
      </div>
    )
  );
}

const Input = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="bg-gray-100 p-2 w-full rounded-xl focus:outline-none"
    />
  );
};

export const Card = ({ className, children }: any) => (
  <div className={`p-5 bg-white showdow-lg rounded-xl ${className}`}>
    {children}
  </div>
);
