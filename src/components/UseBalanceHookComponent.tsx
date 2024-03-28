import {
  useAccount,
  useBalance,
  UseBalanceReturnType,
  useWaitForTransactionReceipt,
} from "wagmi";
import Card from "./common/Card";
import React from "react";
import Image from "next/image";
import { formatUnits, parseEther } from "viem";
import useWalletStore from "../../zustand/store";

const UseBalanceHookComponent = () => {
  const { address, chain } = useAccount();

  const { data, refetch }: UseBalanceReturnType = useBalance({
    address,
    unit: "ether",
  });

  const balance = useWalletStore((state) => state.balance);

  React.useEffect(() => {
    refetch();
  }, [balance]);

  return (
    <div className="mt-10">
      <div className="m-auto text-xl font-bold">
        useBalance Hook{" "}
        <span className="text-gray-600 font-normal text-base">
          (Hook for fetching native currency or token balance)
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
        <Card>
          <div className="flex justify-between">
            <h2 className="text-lg font-medium">Native Balance</h2>
            <Image
              src="/images/refresh.svg"
              width={16}
              height={16}
              onClick={() => refetch()}
              alt={"refresh"}
              className="cursor-pointer hover:animate-spin"
            />
          </div>
          <p className="mt-4">
            {data && parseFloat(formatUnits(data?.value, 18)).toFixed(2)}{" "}
            {chain?.nativeCurrency.name}
          </p>
        </Card>

        {/* <Card className="col-span-2">
          <h2 className="text-lg font-medium">ERC20 Token Balance</h2>

          <p className="mt-4">
            {balance.data?.formatted} {chain?.nativeCurrency.name}
          </p>
        </Card> */}
      </div>
    </div>
  );
};

export default UseBalanceHookComponent;
