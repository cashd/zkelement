import { AztecSdk, GrumpkinAddress } from "@aztec/sdk";
import { createContext } from "react";

interface AztecContextType {
  aztecSDK: AztecSdk | null;
  setAztecSDK: (sdk: AztecSdk) => void;
  setAccountsKeys: (pub: GrumpkinAddress, priv: GrumpkinAddress | null) => void;
  accountPublicKey: GrumpkinAddress | null;
  accountPrivateKey: GrumpkinAddress | null;
}

export const AztecContext = createContext<AztecContextType>({
  aztecSDK: null,
  setAztecSDK: () => {},
  setAccountsKeys: () => {},
  accountPublicKey: null,
  accountPrivateKey: null,
});
