import { useAccount, useSwitchChain } from "wagmi";
import { Card } from "./Account";

const UseSwitchChainComponent = () => {
  const { chains, switchChain } = useSwitchChain();
  const { chainId } = useAccount();

  return (
    <div className="mt-10">
      <div className="m-auto text-xl font-bold">
        useSwitchChain Hook{" "}
        <span className="text-gray-600 font-normal text-base">
          (Hook for switching the target chain for a connector or the Wagmi)
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-2">
        <Card>
          <h2 className="text-lg font-medium">Current Chain</h2>
          <button className="mt-4 bg-indigo-400 p-2 px-4 text-white rounded-full ">
            {chainId}
          </button>
        </Card>

        <Card className="col-span-2">
          <h2 className="text-lg font-medium">
            Available Chains{" "}
            <span className="text-gray-600 font-normal text-base">
              (Select the chain to switch network)
            </span>
          </h2>

          <div className="mt-4 flex flex-wrap gap-4">
            {chains
              .filter((chain) => chain.id !== chainId)
              .map((chain) => (
                <button
                  className="bg-indigo-400 p-2 px-4 text-white rounded-full "
                  onClick={() => switchChain({ chainId: chain.id })}
                  disabled={chainId === chain.id}
                  key={chain.id}
                >
                  {chain.name} <span className="text-[10px]">({chain.id})</span>
                </button>
              ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UseSwitchChainComponent;
