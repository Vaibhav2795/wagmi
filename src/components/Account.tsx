import React from "react";

import UseAccountHookComponent from "./UseAccountHookComponent";
import UseSwitchChainComponent from "./UseSwitchChainComponent";
import UseBalanceHookComponent from "./UseBalanceHookComponent";
import UseReadContractComponent from "./UseReadContractComponent";
import UseSendTransactionComponent from "./UseSendTransactionComponent";

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
        <UseSendTransactionComponent />
      </div>
    )
  );
}
