import { http, createConfig } from "wagmi";
import {
  base,
  bsc,
  bscTestnet,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
  telos,
  polygonAmoy,
} from "wagmi/chains";
import {
  coinbaseWallet,
  injected,
  metaMask,
  safe,
  walletConnect,
} from "wagmi/connectors";

const projectId = "79b1f41a40da47699d86d8a74f3adcbf";

export const config = createConfig({
  chains: [
    mainnet,
    sepolia,
    polygon,
    polygonAmoy,
    bsc,
    bscTestnet,
    base,
    telos,
  ],
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
    [sepolia.id]: http(),
    [base.id]: http(),
    [polygonAmoy.id]: http(),
    [polygon.id]: http(),
    [telos.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
  },
});
