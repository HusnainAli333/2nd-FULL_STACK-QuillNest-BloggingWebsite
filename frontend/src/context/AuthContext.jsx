import { createContext, useContext, useState } from "react";

const Context = createContext({});

function AuthContext({ children }) {
  const [userAuth, setUserAuth] = useState({});

  return (
    <Context.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </Context.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(Context);

  if (context === undefined) {
    throw Error("Context is used outside the scope ");
  }

  return context;
}

export default AuthContext;
