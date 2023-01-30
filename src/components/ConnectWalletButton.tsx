import { InjectedConnector, Signer } from "@wagmi/core";
import { useCreateAztec } from "aztec/hooks/useCreateAztec.js";
import { useAccount, useConnect, useSigner } from "wagmi";

interface ConnectWalletButtonProps {
  disabled?: boolean;
}

export function ConnectWalletButton({}: ConnectWalletButtonProps) {
  const { connect } = useConnect({
    connector: new InjectedConnector(),
    onSuccess: () => {},
  });

  const { data: signer } = useSigner();

  const { mutate: createAztecSDK } = useCreateAztec();

  const { address, isConnected } = useAccount({
    onConnect: async ({ connector }) => {
      console.log("connected!");
      const _signer: Signer = await connector?.getSigner();

      if (_signer) {
        await createAztecSDK({ signer: _signer });
      } else {
        console.warn("no signer");
      }
    },
  });

  if (isConnected) {
    return (
      <button className="btn  bg-black p-2 font-bold text-white">
        Wallet connected at: {address}
      </button>
    );
  }

  return (
    <button
      className="delay-50  bg-black p-2 font-bold text-white transition ease-in-out hover:scale-105 hover:shadow-lg"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}
