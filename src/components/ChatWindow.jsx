import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../context/socketprovider";
import { useGetGroupMessageQuery } from "../store/api/groupApi";
import { useSelector } from "react-redux";
import { GlobalContext } from "../context/globalcontext";

const ChatWindow = ({ group, allowToSendMsg }) => {
  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState([]);
  const socket = useContext(SocketContext);
  const { setMsgCount, gmsgCounst, setGMsgCount } = useContext(GlobalContext);
  const { groupId, roomId } = group;
  const { _id: userId } = useSelector((state) => state?.user?.user);

  // Fetch existing messages from DB
  const { data: groupMessage } = useGetGroupMessageQuery(groupId, {
    refetchOnMountOrArgChange: true,
  });

  // Ref to scroll to bottom of messages
  const messagesEndRef = useRef(null);

  // Update state when DB messages change
  useEffect(() => {
    if (groupMessage?.message) {
      setMsg(groupMessage.message);
    }
  }, [groupMessage]);

  // Join room when roomId changes
  useEffect(() => {
    if (roomId) {
      socket.emit("join-room", roomId);
    }
  }, [socket, roomId]);

  // Attach socket listener only once
  useEffect(() => {
    const handleMessage = (msgData) => {
      const incomingGroupId = msgData?.message?.group;

      if (incomingGroupId === groupId) {
        setMsg((prev) => [...prev, msgData?.message]);
        setGMsgCount((prev) => ({ ...prev, [incomingGroupId]: 0 }));
      } else {
        setGMsgCount((prev) => ({
          ...prev,
          [incomingGroupId]: (prev[incomingGroupId] || 0) + 1,
        }));
      }
    };

    socket.on("msg-from-server", handleMessage);
    return () => socket.off("msg-from-server", handleMessage);
  }, [socket, groupId, setGMsgCount]);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg]);

  // Send message to server
  const handleSend = () => {
    if (!message.trim()) return;

    const messagetosend = {
      content: message,
      group: groupId,
      roomId,
    };

    socket.emit("message", messagetosend);
    setMessage("");
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Message list */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 1,
          scrollbarWidth:"none", // Firefox
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,0.3)",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {msg?.map(({ content, sender, _id, group: grpId }) => {
          const isOwnMessage = sender?._id === userId;

          if (grpId !== groupId) return null; // Only show messages for this group

          return (
            <Stack
              key={_id}
              direction="row"
              spacing={1}
              alignItems="flex-start"
              justifyContent={isOwnMessage ? "flex-end" : "flex-start"}
              sx={{ mb: 1 }}
            >
              {!isOwnMessage && (
                <Avatar
                  alt={sender?.name}
                  src={sender?.avatar}
                  sx={{ width: 24, height: 24 }}
                />
              )}

              <Box
                sx={{
                  backgroundColor: isOwnMessage ? "#DCF8C6" : "#F1F1F1",
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "70%",
                }}
              >
                {!isOwnMessage && (
                  <Typography variant="caption" color="text.secondary">
                    {sender?.name}
                  </Typography>
                )}
                <Typography variant="body2">{content}</Typography>
              </Box>
            </Stack>
          );
        })}
        {/* Scroll target */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Message input */}
      {groupMessage?.allToSendMsg ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            borderTop: "1px solid #ccc",
            pt: 1,
          }}
        >
          <TextField
            fullWidth
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            variant="outlined"
            size="small"
          />
          <IconButton color="primary" onClick={handleSend} sx={{ ml: 1 }}>
            <SendIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
            p: 1,
          }}
        >
          Not Allow To Send Message
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
