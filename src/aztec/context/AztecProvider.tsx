import { AztecSdk, GrumpkinAddress } from "@aztec/sdk";
import { PropsWithChildren, useState } from "react";
import { AztecContext } from "./AztecContext.js";

interface AztecProviderProps {}

export function AztecProvider({
  children,
}: PropsWithChildren<AztecProviderProps>) {
  const [aztecSDK, setAztecSDK] = useState<AztecSdk | null>(null);
  const [accountPublicKey, setAccountPublicKey] =
    useState<GrumpkinAddress | null>(null);
  const [accountPrivateKey, setAccountPrivateKey] =
    useState<GrumpkinAddress | null>(null);

  const handleSetAztecSDK = (sdk: AztecSdk) => {
    setAztecSDK(sdk);
  };

  const handleSetAccountKeys = (
    pub: GrumpkinAddress,
    priv: GrumpkinAddress | null
  ) => {
    setAccountPublicKey(pub);
    setAccountPrivateKey(priv);
  };

  return (
    <AztecContext.Provider
      value={{
        aztecSDK,
        setAztecSDK: handleSetAztecSDK,
        accountPublicKey,
        accountPrivateKey,
        setAccountsKeys: handleSetAccountKeys,
      }}
    >
      {children}
    </AztecContext.Provider>
  );
}
