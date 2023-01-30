import { InjectedConnector, Signer } from "@wagmi/core";
import { useAztec } from "aztec/hooks/useAztec.js";
import { useCreateAztec } from "aztec/hooks/useCreateAztec.js";
import { useAccount, useConnect, useProvider, useSigner } from "wagmi";

export function ConnectWalletButton() {
  const { connect, status, reset } = useConnect({
    connector: new InjectedConnector(),
    onSuccess: () => {},
  });

  const provider = useProvider();
  const { data: signer } = useSigner();

  const { mutate: createAztecSDK, isLoading } = useCreateAztec();
  const aztec = useAztec();

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
      <button
        disabled
        className="btn max-w-fit rounded bg-black p-2 font-bold text-white"
      >
        Wallet connected at: {address}
      </button>
    );
  }

  return (
    <button
      className="delay-50 max-w-fit rounded bg-black p-2 font-bold text-white transition ease-in-out hover:scale-105 hover:shadow-lg"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}
