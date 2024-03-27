import { useBalance, UseBalanceReturnType } from "wagmi";
import { Card } from "./Account";

const UseBalanceHookComponent = ({ address, chain }: any) => {
  const balance: UseBalanceReturnType = useBalance({
    address,
    unit: "ether",
  });

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
          <h2 className="text-lg font-medium">Native Balance</h2>
          <p className="mt-4">
            {balance.data?.formatted} {chain?.nativeCurrency.name}
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
