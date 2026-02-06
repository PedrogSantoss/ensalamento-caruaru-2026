import { useContext } from "react";
import { AppContext } from "../providers/appContext";

export function useApp() {
  return useContext(AppContext);
}
