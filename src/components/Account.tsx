import React from "react";

import UseAccountHookComponent from "./UseAccountHookComponent";
import UseSwitchChainComponent from "./UseSwitchChainComponent";
import UseBalanceHookComponent from "./UseBalanceHookComponent";
import UseReadContractComponent from "./UseReadContractComponent";
import UseSendTransactionComponent from "./UseSendTransactionComponent";
import UseWriteContractComponent from "./UseWriteContractComponent";
import { useAccount } from "wagmi";

export function Account() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className="max-w-4xl w-full my-10">
        <UseAccountHookComponent />
        <UseBalanceHookComponent />
        <UseSwitchChainComponent />
        <UseSendTransactionComponent />
        <UseReadContractComponent />
        <UseWriteContractComponent />
      </div>
    )
  );
}
