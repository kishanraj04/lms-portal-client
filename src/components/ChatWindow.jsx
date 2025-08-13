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
  const { setMsgCount, gmsgCounst, setGMsgCount, theam } = useContext(GlobalContext);
  const { groupId, roomId } = group;
  const { _id: userId } = useSelector((state) => state?.user?.user);

  const { data: groupMessage } = useGetGroupMessageQuery(groupId, {
    refetchOnMountOrArgChange: true,
  });

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (groupMessage?.message) {
      setMsg(groupMessage.message);
    }
  }, [groupMessage]);

  useEffect(() => {
    if (roomId) {
      socket.emit("join-room", roomId);
    }
  }, [socket, roomId]);

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

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msg]);

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

  // Colors for dark/light mode
  const backgroundColor = theam ? "#121212" : "#fff";
  const messageOwnBg = theam ? "#2e7d32" : "#DCF8C6"; // green-ish for own
  const messageOtherBg = theam ? "#424242" : "#F1F1F1"; // dark gray for others
  const textColor = theam ? "rgba(255,255,255,0.87)" : "rgba(0,0,0,0.87)";
  const secondaryTextColor = theam ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)";
  const inputBg = theam ? "#1E1E1E" : "#fff";
  const inputBorderColor = theam ? "#555" : "#ccc";
  const scrollbarThumb = theam ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.3)";

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      {/* Message list */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          p: 1,
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: scrollbarThumb,
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
        }}
      >
        {msg?.map(({ content, sender, _id, group: grpId }) => {
          const isOwnMessage = sender?._id === userId;

          if (grpId !== groupId) return null;

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
                  backgroundColor: isOwnMessage ? messageOwnBg : messageOtherBg,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  maxWidth: "70%",
                  color: isOwnMessage ? "white" : textColor,
                }}
              >
                {!isOwnMessage && (
                  <Typography variant="caption" color={secondaryTextColor}>
                    {sender?.name}
                  </Typography>
                )}
                <Typography variant="body2"  color={`${!theam?"black":"white"}`}>{content}</Typography>
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
            borderTop: `1px solid ${inputBorderColor}`,
            pt: 1,
            backgroundColor: backgroundColor,
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
            sx={{
              backgroundColor: inputBg,
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: inputBorderColor,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theam ? "#90caf9" : undefined,
              },
              input: { color: textColor },
            }}
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
            backgroundColor: backgroundColor,
          }}
        >
          Not Allow To Send Message
        </Box>
      )}
    </Box>
  );
};

export default ChatWindow;
