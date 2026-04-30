import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const SocketContext = createContext(null);

// ✅ FIX: Society ka societyId bhi support karo, sirf userId nahi
// Society login karne par user.userId = null hota hai, lekin user.societyId hota hai
export const getLoggedInId = () => {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (!user) return null;
  // Student ke liye userId, Society ke liye societyId
  return user.userId || user.societyId || null;
};

export function SocketProvider({ children }) {
  const socketRef = useRef(null);
  const [socket, setSocket] = useState(null);

  const connectSocket = () => {
    const myId = getLoggedInId();
    if (!myId) return;

    // Already connected for this user
    if (socketRef.current?.connected && socketRef.current._myId === myId) return;

    // Disconnect old socket if any
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }

    const s = io(BASE_URL, {
      query: { userId: myId }, // backend onlineUsers map mein myId store hoga
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 10,
    });
    s._myId = myId;
    socketRef.current = s;
    setSocket(s);
  };

  // Connect on mount
  useEffect(() => {
    connectSocket();

    // Listen for storage events (login/logout from same or other tabs)
    const onStorage = (e) => {
      if (e.key === "user") {
        const myId = getLoggedInId();
        if (!myId) {
          // Logout — disconnect socket
          if (socketRef.current) {
            socketRef.current.disconnect();
            socketRef.current = null;
            setSocket(null);
          }
        } else {
          connectSocket();
        }
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  // Disconnect on unmount
  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
