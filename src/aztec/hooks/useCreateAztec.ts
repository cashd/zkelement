import { useMutation } from "@tanstack/react-query";
import { AztecContext } from "aztec/context/AztecContext.js";
import { createAztecAccount } from "aztec/createAztecAccount.js";
import { Signer } from "ethers";
import { useContext } from "react";
import { useProvider } from "wagmi";

interface CreateAztecArgs {
  signer: Signer;
}

export function useCreateAztec() {
  const { aztecSDK, setAztecSDK, setAccountsKeys } = useContext(AztecContext);
  const provider = useProvider();

  return useMutation(async ({ signer }: CreateAztecArgs) => {
    // only create sdk if doesnt exist (might break wallet switching)
    if (!aztecSDK) {
      const address = await signer.getAddress();
      const { sdk, accPriKey, accPubKey } = await createAztecAccount(
        provider,
        signer,
        address
      );

      setAztecSDK(sdk);
      setAccountsKeys(accPubKey, null);
    }
  });
}
