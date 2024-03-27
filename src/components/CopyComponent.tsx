import Image from "next/image";
import React from "react";
import Clipboard from "react-clipboard.js";

export default function CopyComponent({
  copyText,
  children,
}: {
  copyText: string;
  children: React.ReactNode;
}) {
  const [isCopied, setIsCopied] = React.useState(false);

  return (
    <Clipboard
      component="span"
      data-clipboard-text={copyText}
      className="flex cursor-pointer relative rounded-lg px-1 transition ease-in-out duration-100"
      onClick={() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
      }}
    >
      {children}
      <Image src="/images/copy.svg" alt="copy" width={14} height={14} />
      {isCopied && (
        <span className="w-full text-center rounded-md bg-indigo-100 absolute text-[10px] right-0 -bottom-6">
          Copied
        </span>
      )}
    </Clipboard>
  );
}
