import { Web3 } from "web3";

const web3 = new Web3();

export function formatAddress({ address }: { address: string }) {
  if (address) {
    return `${address.substring(0, 5)}...${address.substring(
      address.length - 5
    )}`;
  }
  return null;
}

export function etherToWei(amount: number) {
  return parseFloat(web3.utils?.fromWei(amount, "ether")).toFixed(2);
}
