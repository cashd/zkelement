import { ConnectWalletButton } from "components/ConnectWalletButton.js";
import { ReactElement } from "react";

export function Home(): ReactElement {
  return (
    <div className="h-screen">
      <div className="m-auto flex max-w-lg flex-col gap-y-6 pt-36">
        <h1 className="text-4xl font-bold">zkElement</h1>
        <ConnectWalletButton />
      </div>
    </div>
  );
}
