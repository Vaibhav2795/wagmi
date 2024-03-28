import React from "react";
import { parseEther } from "viem";
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";

import Card from "./common/Card";
import Input from "./common/Input";
import useWalletStore from "../../zustand/store";
import { formatAddress } from "@/utils/helper";

interface FormData {
  address: `0x${string}`;
  amount: string;
}
const intitalState: FormData = {
  address: "0x00",
  amount: "",
};

export default function UseSendTransactionComponent() {
  const { data: hash, sendTransaction, isPending } = useSendTransaction();

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
    console.log({ formData });
    const { address, amount } = formData;
    sendTransaction({ to: address, value: parseEther(amount) });
  };

  const reFetchBalance = useWalletStore((state: any) => state.reFetchBalance);

  React.useEffect(() => {
    setFormData(intitalState);
    reFetchBalance();
  }, [isConfirmed]);

  return (
    <div className="mt-10">
      <div className="m-auto text-xl font-bold">
        useSendTransaction Hook{" "}
        <span className="text-gray-600 font-normal text-base">
          (Hook for creating, signing, and sending transactions to networks)
        </span>
      </div>
      <div className="grid grid-cols-1 gap-5 mt-2">
        <Card>
          <h2 className="text-lg font-medium">Current Chain</h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4"
          >
            <Input
              placeholder="to address"
              value={formData.address === "0x00" ? "" : formData.address}
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
              disabled={isPending}
              className="bg-indigo-400 p-2 px-4 text-white rounded-full disabled:opacity-10"
            >
              {isPending ? "Sending" : "Send"}
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
