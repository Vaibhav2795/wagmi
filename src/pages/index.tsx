import { Inter } from "next/font/google";

import { useAccount } from "wagmi";
import { Account } from "@/components/Account";
import { WalletOptions } from "@/components/WalletOptions";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

function ConnectWallet() {
  const { isConnected } = useAccount();
  if (isConnected) return <Account />;
  return <WalletOptions />;
}

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-4 ${inter.className} bg-gradient-to-br from-indigo-200 to-white `}
    >
      <Head>
        <title>Wagmi</title>
      </Head>

      {/* <Profile /> */}
      <ConnectWallet />
    </main>
  );
}
