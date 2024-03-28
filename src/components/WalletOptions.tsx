"use client";
import * as React from "react";
import Image from "next/image";
import { Connector, useConnect, useSwitchChain } from "wagmi";

export function WalletOptions() {
  const { connectors, connect } = useConnect();
  const { chains } = useSwitchChain();

  const [selectedChain, setSelectedChain] = React.useState(1);

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    isClient && (
      <div className="bg-white max-w-3xl p-8 showdow-lg rounded-lg my-auto">
        <h2 className="text-xl font-semibold">Connect wallet</h2>
        <p className="mb-6 text-gray-600">
          Choose how you want to connect. There are several wallet providers
        </p>

        <div className="mb-6 flex gap-2 flex-wrap">
          {chains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => setSelectedChain(chain.id)}
              className={`p-2 font-semibold rounded-lg ${
                selectedChain === chain.id
                  ? "bg-indigo-400 text-white "
                  : "text-gray-400 hover:bg-indigo-50"
              }`}
            >
              {chain.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {connectors.map((connector, index) => (
            <WalletOption
              key={connector.uid}
              connector={connector}
              onClick={() => {
                console.log(connector.name);
                connect({ connector, chainId: selectedChain });
              }}
              img={getImage({ name: connector.name })}
            />
          ))}
        </div>
      </div>
    )
  );
}

function getImage({ name }: { name: string }) {
  switch (name) {
    case "WalletConnect":
      return "/images/connectors/wallet-connect.svg";
    case "MetaMask":
      return "/images/connectors/metamask-icon.svg";
    case "Safe":
      return "/images/connectors/safe.svg";
    case "Coinbase Wallet":
      return "/images/connectors/coinbase.svg";
    default:
      return "/images/connectors/link.svg";
  }
}

function WalletOption({
  connector,
  onClick,
  img,
}: {
  connector: Connector;
  onClick: () => void;
  img: string;
}) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const provider = await connector.getProvider();
      setReady(!!provider);
    })();
  }, [connector]);

  return (
    ready && (
      <div
        onClick={onClick}
        className="bg-slate-100 p-2 px-4 rounded-lg border border-gray-300 flex justify-between h-14 cursor-pointer"
      >
        <p className="text-base font-medium my-auto ">{connector.name}</p>
        <Image
          src={img}
          width={40}
          height={40}
          alt={connector.name}
          className="my-auto"
        />
      </div>
    )
  );
}
