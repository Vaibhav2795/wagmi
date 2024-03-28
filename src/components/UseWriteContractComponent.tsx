import React from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { writeContract } from "wagmi/actions";

import ERC20 from "../contracts/erc20Abi.json";

import Card from "./common/Card";
import Input from "./common/Input";
import useWalletStore from "../../zustand/store";
import { formatAddress } from "@/utils/helper";

interface FormData {
  address: `0x${string}`;
  amount: string;
  contractAddress: `0x${string}`;
}
const intitalState: FormData = {
  address: "0x0",
  amount: "",
  contractAddress: "0x0",
};

export default function UseWriteContractComponent() {
  const { data: hash, writeContract } = useWriteContract();

  const { chain } = useAccount();
  const blockExplorerUrl = chain?.blockExplorers?.default.url;

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const [formData, setFormData] = React.useState(intitalState);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const { address, amount, contractAddress } = formData;
    writeContract({
      address: contractAddress,
      abi: ERC20,
      functionName: "transfer",
      args: [address, parseEther(amount)],
    });
  };

  const reFetchBalance = useWalletStore((state: any) => state.reFetchBalance);

  React.useEffect(() => {
    setFormData(intitalState);
    reFetchBalance();
  }, [isConfirmed]);

  return (
    <div className="mt-10">
      <div className="m-auto text-xl font-bold">
        UseWriteContractComponent Hook{" "}
        <span className="text-gray-600 font-normal text-base">
          (Action for executing a write function on a contract.)
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-2">
        <Card>
          <h2 className="text-lg font-medium">ERC20 Token Transfer</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
          >
            <Input
              placeholder="contract address"
              value={
                formData.contractAddress === "0x0"
                  ? ""
                  : formData.contractAddress
              }
              onChange={handleChange}
              name="contractAddress"
            />
            <Input
              placeholder="to address"
              value={formData.address === "0x0" ? "" : formData.address}
              onChange={handleChange}
              name="address"
            />
            <Input
              placeholder="0.05"
              value={formData.amount}
              onChange={handleChange}
              name="amount"
            />
            <button
              type="submit"
              className="bg-indigo-400 p-2 px-4 text-white rounded-full disabled:opacity-10"
            >
              Send
            </button>

            {hash && (
              <p>
                Transaction hash:{" "}
                <a href={`${blockExplorerUrl}/tx/${hash}`} target="_blank">
                  {formatAddress({ address: hash })}
                </a>
              </p>
            )}

            {isConfirming && <div>Waiting for confirmation...</div>}
            {isConfirmed && <div>Transaction confirmed.</div>}
          </form>
        </Card>
      </div>
    </div>
  );
}
