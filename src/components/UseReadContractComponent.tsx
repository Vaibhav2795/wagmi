import React from "react";
import { useAccount, UseAccountReturnType, useReadContracts } from "wagmi";
import { erc20Abi, formatEther, isAddress } from "viem";

import Card from "./common/Card";
import Input from "./common/Input";
import CopyComponent from "./CopyComponent";
import { formatAddress } from "@/utils/helper";

const UseReadContractComponent = () => {
  const { address, chain }: UseAccountReturnType = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;

  const [contractAddress, setContractAddress] = React.useState<`0x${string}`>(
    "0x261d19155d824a7BDF4F7aE6D9B9f25401650319"
  );

  const [formData, setFormData] = React.useState({
    contractAddress: "0x261d19155d824a7BDF4F7aE6D9B9f25401650319",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const tokenContract = {
    address: contractAddress,
    abi: erc20Abi,
  } as const;

  const result = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        ...tokenContract,
        functionName: "name",
      },
      {
        ...tokenContract,
        functionName: "symbol",
      },
      {
        ...tokenContract,
        functionName: "totalSupply",
      },
      {
        ...tokenContract,
        functionName: "decimals",
      },
      { ...tokenContract, functionName: "balanceOf", args: [address || "0x0"] },
    ],
  });

  return (
    <div className="mt-10">
      <div className="m-auto text-xl font-bold">
        useReadContract Hook{" "}
        <span className="text-gray-600 font-normal text-base">
          (Hook for calling a read-only function on a contract, and returning
          the response)
        </span>
      </div>
      <div className="grid grid-cols-1 my-4">
        <Card>
          ERC20 Contract Address
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isAddress(formData.contractAddress) &&
                setContractAddress(formData.contractAddress);
            }}
            className="grid sm:flex gap-4 mt-2"
          >
            <Input
              placeholder="contract address"
              value={formData.contractAddress}
              name="contractAddress"
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-40 bg-indigo-400 p-2 px-4 text-white rounded-full disabled:opacity-10"
            >
              Set Contract
            </button>
          </form>
        </Card>
      </div>
      <div className="grid grid-cols-3 gap-5 mt-2">
        <Card className="col-span-3">
          {result && result.data && (
            <>
              <h2 className="text-lg font-medium flex gap-2 flex-wrap">
                Token Address{" "}
                <span className="text-gray-600 font-normal text-base flex gap-1 my-auto">
                  <CopyComponent
                    copyText={`${blockExplorerUrl}/token/${tokenContract.address}`}
                  >
                    {formatAddress({
                      address: tokenContract.address,
                    })}
                  </CopyComponent>
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 gap-x-12 gap-y-4">
                <h1 className="flex justify-between">
                  Token Balance:{" "}
                  <span className="font-semibold">
                    {parseFloat(formatEther(result.data[4])).toFixed(2)}
                  </span>
                </h1>
                <h1 className="flex justify-between">
                  Name: <span className="font-semibold">{result.data[0]}</span>
                </h1>
                <h1 className="flex justify-between">
                  Symbol:{" "}
                  <span className="font-semibold">{result.data[1]}</span>
                </h1>
                <h1 className="flex justify-between">
                  TotalSupply:{" "}
                  <span className="font-semibold">
                    {parseFloat(formatEther(result.data[2])).toFixed(2)}
                  </span>
                </h1>

                <h1 className="flex justify-between">
                  Decimal:
                  <span className="font-semibold">{result.data[3]}</span>
                </h1>
              </div>
            </>
          )}

          {result && !result.data && (
            <p className="pt-2 text-orange-400">
              The contract you are attempting to set may not be an ERC20 token
              contract, or it could be deployed on a different blockchain
              network
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UseReadContractComponent;
