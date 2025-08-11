// ChatList.jsx
import React, { useContext } from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import { GlobalContext } from "../context/globalcontext";

const ChatList = ({ group = [], onSelectGroup, selectedGroup }) => {
  // const
  const { gmsgCounst,setGMsgCount,msgcount,setMsgCount} = useContext(GlobalContext);
  //  console.log(msgcount);
  return (
    <Box sx={{ overflowY: "auto", maxHeight: "100%" }}>
      <List>
        {group?.group?.map((g) => (
          <ListItem
            key={g?._id}
            component="button"
            onClick={() => {
              // Reset unread count for this group
              setMsgCount((prev) => ({ ...prev, [g.groupId]: 0 }));
              setGMsgCount((prev) => ({ ...prev, [g.groupId]: 0 }));
              onSelectGroup(g);
            }}
            sx={{
              boxShadow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              bgcolor: `${
                selectedGroup?.groupId !== g?.groupId ? "gray" : "brown"
              }`,
              p: 1,
              cursor: "pointer",
              "&:hover": { backgroundColor: "gray" },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemAvatar>
                <Avatar src={g?.groupTheam} alt={g?.groupName} />
              </ListItemAvatar>
              <ListItemText primary={g?.groupName} />
            </Box>

            {gmsgCounst[g.groupId] > 0 && (
              <Typography
                variant="body2"
                sx={{
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "0.8rem",
                  marginRight: 2,
                }}
              >
                {gmsgCounst[g.groupId]}
              </Typography>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
