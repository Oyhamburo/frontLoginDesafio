import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const API = "http://localhost:2000";

  const [session, setSession] = useState();

  const data = {
    setSession,
    session,
    API,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export default CartProvider;

export { CartContext };
