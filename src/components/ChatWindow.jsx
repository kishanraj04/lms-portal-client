import React, { useState } from "react";
import { Box, Typography, Paper, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const ChatWindow = ({ group }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;
    console.log("Sending:", message); // Replace with actual send logic
    setMessage(""); // Clear input
  };

  return (
    <Box sx={{ p: 2, height: "94%", display: "flex", flexDirection: "column"}}>
      {/* Chat messages */}
      <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
        <Typography variant="h6" gutterBottom>
          Chatting with {group?.name}
        </Typography>
        <Paper elevation={1} sx={{ p: 2, maxWidth: "70%", mb: 1 }}>
          Hi there! 👋
        </Paper>
        <Paper
          elevation={1}
          sx={{ p: 2, maxWidth: "70%", ml: "auto", mb: 1, bgcolor: "#e0f7fa" }}
        >
          Hello! How can I help?
        </Paper>
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
