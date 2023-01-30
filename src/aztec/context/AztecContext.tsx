import { AztecSdk } from "@aztec/sdk";
import { createContext } from "react";

interface AztecContextType {
  aztecSDK: AztecSdk | null;
  setAztecSDK: (sdk: AztecSdk) => void;
}

export const AztecContext = createContext<AztecContextType>({
  aztecSDK: null,
  setAztecSDK: () => {},
});
