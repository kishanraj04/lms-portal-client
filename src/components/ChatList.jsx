// ChatList.jsx
import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
} from "@mui/material";

const ChatList = ({ group = [], onSelectGroup }) => {
  console.log(group);
  return (
    <Box sx={{ overflowY: "auto", maxHeight: "100%" }}>
      <List>
        {group?.group?.map((g) => (
          <ListItem button key={g?._id} onClick={() => onSelectGroup(g)} sx={{boxShadow:1}}>
            <ListItemAvatar>
              <Avatar src={g?.groupTheam} alt={g?.groupName} />
            </ListItemAvatar>
            <ListItemText primary={g?.groupName} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
