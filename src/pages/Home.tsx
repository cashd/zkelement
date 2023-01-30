import { useBridgeEth } from "aztec/hooks/useBridgeEth.js";
import { ConnectWalletButton } from "components/ConnectWalletButton.js";
import { ReactElement } from "react";
import { useSigner } from "wagmi";

export function Home(): ReactElement {
  const { mutate: bridgeEth } = useBridgeEth();
  const { data: signer } = useSigner();

  return (
    <div className="h-screen">
      <div className="m-auto flex max-w-lg flex-col gap-y-6 pt-36">
        <h1 className="text-4xl font-bold">zkElement</h1>
        <ConnectWalletButton />

        <button
          className="btn"
          onClick={async () => {
            if (signer) {
              bridgeEth({
                amount: "10",
                signer: signer,
              });
            } else {
              console.log("no signer, bridge eth");
            }
          }}
        >
          bridge 10 eth
        </button>
      </div>
    </div>
  );
}
