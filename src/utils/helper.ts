export function formatAddress({
  address,
}: {
  address: string | `0x${string}`;
}) {
  if (address) {
    return `${address.substring(0, 5)}...${address.substring(
      address.length - 5
    )}`;
  }
  return null;
}

export function formatHash({ hash }: { hash: `0x${string}` }) {
  if (hash) {
    return `${hash.substring(0, 5)}...${hash.substring(hash.length - 5)}`;
  }
  return null;
}
