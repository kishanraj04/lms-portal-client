import { useMemo, useEffect } from "react";
import { createContext } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io("http://localhost:3000/api/v1"), []);

  // Optional: Clean up on unmount
  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};
