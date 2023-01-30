import { AztecContext } from "aztec/context/AztecContext.js";
import { useContext } from "react";

const SDK_NOT_INIT = "Trying to use Aztec SDK without initializing.";

export function useAztec() {
  const aztecContext = useContext(AztecContext);

  // if (!aztecContext.aztecSDK) {
  //   throw new Error(SDK_NOT_INIT);
  // }

  return aztecContext;
}
