// ChatPage.jsx
import React, { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetGroupQuery } from "../store/api/groupApi";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { data: group = [] } = useGetGroupQuery();
  console.log(group?.allowToSend);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSelectGroup = (group) => {
    setSelectedGroup(group);
    if (isMobile) setDrawerOpen(false); // close drawer on mobile
  };
  console.log(selectedGroup);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column",overflow:"hidden" }}>
      {/* AppBar for mobile */}
      {isMobile && <MenuIcon onClick={() => setDrawerOpen(true)} />}

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          height: "100%",
          position: "relative",
        }}
      >
        {/* Sidebar for Desktop */}
        {!isMobile && (
          <Box
            sx={{
              width: 300,
              borderRight: "1px solid #ccc",
              overflowY: "auto",
            }}
          >
            <ChatList group={group} onSelectGroup={handleSelectGroup} selectedGroup={selectedGroup}/>
          </Box>
        )}

        {/* Drawer for Mobile */}
        {isMobile && (
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            ModalProps={{ keepMounted: true }}
            PaperProps={{
              sx: {
                width: "100%",
                maxHeight: "100%",
                display: "flex",
                flexDirection: "column",
                position: "absolute",
                top: "60px",
                backgroundColor: "gray",
              },
            }}
          >
            <Box sx={{ flexGrow: 1, overflowY: "auto" }}>
              <ChatList
                group={group}
                onSelectGroup={handleSelectGroup}
                selectedGroup={selectedGroup}
              />
            </Box>
          </Drawer>
        )}

        {/* Chat Window */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: "auto",

            transition: "all 0.3s ease-in-out",
          }}
        >
          {selectedGroup ? (
            <ChatWindow group={selectedGroup} allowToSendMsg={group?.allowToSend}/>
          ) : (
            <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
              Select a chat to start messaging
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatPage;
