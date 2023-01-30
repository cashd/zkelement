import { AztecContext } from "aztec/context/AztecContext.js";
import { useContext } from "react";

export function useAztec() {
  const aztecContext = useContext(AztecContext);

  return aztecContext;
}
