import React from "react";
import { useAccount, useReadContracts } from "wagmi";

import { Card } from "./Account";
import Erc20Abi from "../contracts/erc20Abi.json";
import { etherToWei, formatAddress } from "@/utils/helper";
import CopyComponent from "./CopyComponent";

const tokenContract = {
  address: "0x261d19155d824a7BDF4F7aE6D9B9f25401650319",
  abi: Erc20Abi,
} as const;

const UseReadContractComponent = () => {
  const { address } = useAccount();

  const result: any = useReadContracts({
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
        functionName: "owner",
      },
      {
        ...tokenContract,
        functionName: "totalSupply",
      },
      {
        ...tokenContract,
        functionName: "decimals",
      },
      { ...tokenContract, functionName: "balanceOf", args: [address] },
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
      <div className="grid grid-cols-3 gap-5 mt-2">
        <Card className="col-span-3">
          <h2 className="text-lg font-medium flex gap-2 flex-wrap">
            Token Address{" "}
            <span className="text-gray-600 font-normal text-base flex gap-1 my-auto">
              <CopyComponent
                copyText={`https://mumbai.polygonscan.com/token/${tokenContract.address}`}
              >
                {formatAddress({
                  address: tokenContract.address,
                })}
              </CopyComponent>
            </span>
          </h2>

          {result.isSuccess && result.data ? (
            <div className="grid grid-cols-3 mt-4">
              <h1>
                Token Balance:{" "}
                <span className="font-semibold">
                  {etherToWei(result.data[5])}
                </span>
              </h1>
              <h1>
                Total Supply:{" "}
                <span className="font-semibold">{result.data[0]}</span>
              </h1>
              <h1>
                Symbol: <span className="font-semibold">{result.data[1]}</span>
              </h1>
              <h1>
                totalSupply:{" "}
                <span className="font-semibold">
                  {etherToWei(result.data[3])}
                </span>
              </h1>
              <h1>
                Owner:{" "}
                <span className="font-semibold">
                  {formatAddress({ address: result.data[2] })}
                </span>
              </h1>
              <h1>
                Decimal:
                <span className="font-semibold">{result.data[4]}</span>
              </h1>
            </div>
          ) : (
            <p className="pt-2 text-orange-400">
              This contract has been deployed on the Polygon Mumbai. Please
              switch to the Mumbai Testnet (80001) to access the result.
            </p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default UseReadContractComponent;
