import React from "react";
import Image from "next/image";
import { useAccount, useDisconnect } from "wagmi";

import Card from "./common/Card";
import CopyComponent from "./CopyComponent";
import { formatAddress } from "@/utils/helper";

export default function UseAccountHookComponent() {
  const { address, connector, chain, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  const blockExplorerUrl = chain?.blockExplorers?.default.url;

  return (
    <Card className="flex justify-between flex-wrap gap-2">
      <div className="flex gap-2 flex-wrap">
        <Image
          src={"/images/default-profile.svg"}
          width={50}
          height={50}
          alt="ens-avatar"
          className="rounded-full"
        />
        <div>
          {address && (
            <p className="text-xl w-fit">
              <CopyComponent copyText={address}>
                {formatAddress({ address })}
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
  );
}
