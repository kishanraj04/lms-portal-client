import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { SocketContext } from "../context/socketprovider";
import { useGetGroupMessageQuery } from "../store/api/groupApi";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ChatWindow = ({ group }) => {
  const [message, setMessage] = useState("");
  const socket = useContext(SocketContext);
  const { groupId, roomId } = group;
  const { _id: userId } = useSelector((state) => state?.user?.user);
  const { data: groupMessage, messageResp } = useGetGroupMessageQuery(groupId, {
    refetchOnMountOrArgChange: true,
  });

  const [msg,setMsg] = useState([])

  useEffect(()=>{
    setMsg(groupMessage?.message)
  },[groupMessage])
  console.log(msg);
  useEffect(() => {
    socket.emit("join-room", roomId);

    const handleMessage = (msg) => {
      console.log(msg);
       setMsg((prev)=>[...prev,msg?.message])
    };

    socket.on("msg-from-server", handleMessage);

    return () => {
      socket.off("msg-from-server", handleMessage);
    };
  }, [socket, roomId]);

  const handleSend = () => {
    if (!message.trim()) return;
    const messagetosend = {
      content: message,
      groupId: group?.groupId,
      roomId,
    };
    socket.emit("message", messagetosend);
    setMessage("");
  };

  return (
    <Box sx={{ p: 2, height: "94%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1 }}>
        {msg?.map(({ content, sender, _id }) => {
          const isOwnMessage = sender?._id === userId; // <-- your logged-in user ID
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
      </Box>

      {/* Message input field */}
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
    </Box>
  );
};

export default ChatWindow;
