import React from 'react';
import { List, ListItem, ListItemText, Divider } from '@mui/material';

const users = ['Alice', 'Bob', 'Charlie'];

function ChatList({ onSelect }) {
  return (
    <List>
      {users.map((user, index) => (
        <div key={user}>
          <ListItem button onClick={() => onSelect(user)}>
            <ListItemText primary={user} />
          </ListItem>
          {index < users.length - 1 && <Divider />}
        </div>
      ))}
    </List>
  );
}

export default ChatList;
