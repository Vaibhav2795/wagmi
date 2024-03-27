import { http, createConfig } from "wagmi";
import { base, mainnet, polygon, polygonMumbai } from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";

const projectId = "79b1f41a40da47699d86d8a74f3adcbf";

export const config = createConfig({
  chains: [mainnet, base, polygonMumbai, polygon],
  connectors: [
    injected(),
    walletConnect({ projectId }),
    metaMask(),
    safe(),
    coinbaseWallet({
      appName: "My Wagmi App",
    }),
  ],
  transports: {
    [mainnet.id]: http(),
    [base.id]: http(),
    [polygonMumbai.id]: http(),
    [polygon.id]: http(),
  },
});
