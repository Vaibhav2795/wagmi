import Image from "next/image";
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from "wagmi";
import UseBalanceHookComponent from "./UseBalanceHookComponent";
import UseSwitchChainComponent from "./UseSwitchChainComponent";
import UseReadContractComponent from "./UseReadContractComponent";
import React from "react";
import { formatAddress } from "@/utils/helper";
import CopyComponent from "./CopyComponent";

export function Account() {
  const { address, connector, chain, chainId } = useAccount();

  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName! });

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const blockExplorerUrl = chain?.blockExplorers?.default.url;

  return (
    isClient && (
      <div className="max-w-4xl w-full">
        <Card className="flex justify-between flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            <Image
              src={ensAvatar || "/images/default-profile.svg"}
              width={50}
              height={50}
              alt="ens-avatar"
              className="rounded-full"
            />
            <div>
              {address && (
                <p className="text-xl w-fit">
                  <CopyComponent
                    copyText={`${blockExplorerUrl}/address/${address}`}
                  >
                    {ensName
                      ? `${ensName} (${address})`
                      : formatAddress({ address })}
                  </CopyComponent>
                </p>
              )}
              <p className="text-sm">
                Connected to {connector?.name} Connector with {chainId}
              </p>
            </div>
          </div>
          <button
            className="bg-indigo-400 text-white px-5 rounded-full h-10"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </Card>

        <UseBalanceHookComponent address={address} chain={chain} />
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
