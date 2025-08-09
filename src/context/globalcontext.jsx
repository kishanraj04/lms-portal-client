import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  
 const [msgcount,setMsgCount] = useState(0);

  return (
    <GlobalContext.Provider value={{msgcount,setMsgCount}}>
      {children}
    </GlobalContext.Provider>
  );
};
