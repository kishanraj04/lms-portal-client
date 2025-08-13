import { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  
 const [msgcount,setMsgCount] = useState({});
 const [gmsgCounst,setGMsgCount] = useState({})
 const [theam,setTheam] = useState(false);

  return (
    <GlobalContext.Provider value={{msgcount,setMsgCount,gmsgCounst,setGMsgCount,theam,setTheam}}>
      {children}
    </GlobalContext.Provider>
  );
};
