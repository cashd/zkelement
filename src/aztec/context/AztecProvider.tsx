import { AztecSdk } from "@aztec/sdk";
import { ReactNode, useState } from "react";
import { AztecContext } from "./AztecContext.js";

interface AztecProviderProps {
  children: ReactNode[];
}

export function AztecProvider({ children }: AztecProviderProps) {
  const [aztecSDK, setAztecSDK] = useState<AztecSdk | null>(null);

  const handleSetAztecSDK = (sdk: AztecSdk) => {
    setAztecSDK(sdk);
  };

  return (
    <AztecContext.Provider value={{ aztecSDK, setAztecSDK: handleSetAztecSDK }}>
      {children}
    </AztecContext.Provider>
  );
}
