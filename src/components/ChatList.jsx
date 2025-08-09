// ChatList.jsx
import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";

const ChatList = ({ group = [], onSelectGroup }) => {
  // const

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "100%" }}>
      <List>
        {group?.group?.map((g) => (
          <ListItem
            key={g?._id}
            component="button"
            onClick={() => onSelectGroup(g)}
            sx={{
              boxShadow: 1,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
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

            <Typography variant="body2" color="green" sx={{marginRight:2}}>
              0
            </Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatList;
