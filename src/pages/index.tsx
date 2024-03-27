import Image from "next/image";
import { Inter } from "next/font/google";

import { useAccount, useEnsName } from "wagmi";
import { Account } from "@/components/Account";
import { WalletOptions } from "@/components/WalletOptions";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

const Profile = () => {
  const { address } = useAccount();
  const { data, error, status } = useEnsName({ address });
  if (status === "pending") return <div>Loading ENS name</div>;
  if (status === "error")
    return <div>Error fetching ENS name: {error.message}</div>;
  return <div>ENS name: {data}</div>;
};

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 ${inter.className}`}
    >
      <Head>
        <title>Wagmi</title>
      </Head>
      {/* <Profile /> */}
      <ConnectWallet />
    </main>
  );
}
