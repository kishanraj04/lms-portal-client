import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  
 const [msgcount,setMsgCount] = useState({});
 const [gmsgCounst,setGMsgCount] = useState({})

  return (
    <GlobalContext.Provider value={{msgcount,setMsgCount,gmsgCounst,setGMsgCount}}>
      {children}
    </GlobalContext.Provider>
  );
};
