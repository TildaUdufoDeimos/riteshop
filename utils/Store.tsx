import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext(null);
const initialState = {
  darkMode: Cookies.get("darkMode") === "ON",
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    default:
      return state;
  }
}
export function StoreProvider(props: any) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <Store.Provider value={value}>
      {props.children}
    </Store.Provider>
  );
}