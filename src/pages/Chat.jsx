import React, { useState } from 'react';
import {
  Box,
  IconButton,
  useMediaQuery,
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Stack,
  TextField,
  Button,
  Avatar,
  Fade,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SendIcon from '@mui/icons-material/Send';
const users = ['Alice', 'Bob', 'Charlie'];

function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showChatList, setShowChatList] = useState(true);
  const isMobile = useMediaQuery('(max-width:768px)');

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    if (isMobile) setShowChatList(false);
  };

  const handleBack = () => {
    setShowChatList(true);
    setSelectedUser(null);
  };

  const ChatList = () => (
    <Box
      sx={{
        height: '100%',
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 2,
        overflowY: 'auto',
      }}
    >
      <List sx={{ width: '100%' }}>
        {users.map((user, index) => (
          <div key={user}>
            <ListItem
              button
              onClick={() => handleUserSelect(user)}
              sx={{
                '&:hover': { backgroundColor: '#f5f5f5' },
                px: 2,
                py: 1.5,
              }}
            >
              <Avatar sx={{ mr: 2 }}>{user[0]}</Avatar>
              <ListItemText
                primary={user}
                primaryTypographyProps={{ fontWeight: 'bold' }}
              />
            </ListItem>
            {index < users.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </Box>
  );

  const ChatWindow = () => (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#fff',
        borderRadius: 2,
        boxShadow: 2,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          p: 1.5,
          bgcolor: '#404548ff',
          color: '#fff',
          position: 'relative',
        }}
      >
        {isMobile && (
          <IconButton
            onClick={handleBack}
            sx={{
              position: 'absolute',
              left: -9,
              color: '#fff',
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
      </Box>

      {/* Messages area */}
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: '#f4f7fb',
          p: 2,
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              alignSelf: 'flex-start',
              bgcolor: '#fff',
              p: 1,
              px: 2,
              borderRadius: 2,
              maxWidth: '70%',
              boxShadow: 1,
            }}
          >
            Hi {selectedUser}
          </Box>
          <Box
            sx={{
              alignSelf: 'flex-start',
              bgcolor: '#fff',
              p: 1,
              px: 2,
              borderRadius: 2,
              maxWidth: '70%',
              boxShadow: 1,
            }}
          >
            How are you?
          </Box>
        </Box>
      </Box>

      {/* Input area */}
  

<Box
  sx={{
    p: 1.5,
    borderTop: '1px solid #e0e0e0',
    bgcolor: '#f9fafb',
    boxShadow: '0 -1px 5px rgba(0,0,0,0.05)',
  }}
>
  <Stack
    direction="row"
    // spacing={1}
    alignItems="center"
    sx={{
      bgcolor: '#fff',
    //   p: 1,
      borderRadius: '10px',
    //   boxShadow: 1,
    }}
  >
    <TextField
      variant="standard"
      placeholder="Type a message..."
      fullWidth
      InputProps={{
        disableUnderline: true,
        // sx: { px: 1 },
      }}
    />
    <IconButton
      color="primary"
      sx={{
        bgcolor: '#1976d2',
        color: '#fff',
        '&:hover': { bgcolor: '#115293' },
        borderRadius: '50%',
        width: 30,
        height: 30,
      }}
    >
      <SendIcon />
    </IconButton>
  </Stack>
</Box>

    </Box>
  );

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        flexDirection: isMobile ? 'column' : 'row',
        bgcolor: '#eaeef1',
        p: isMobile ? 1 : 2,
        gap: 2,
      }}
    >
      {/* Desktop Layout */}
      {!isMobile && (
        <>
          <Box sx={{ width: '30%', height: '100%' }}>
            <ChatList />
          </Box>
          <Box sx={{ flex: 1, height: '100%' }}>
            {selectedUser ? (
              <ChatWindow />
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 20,
                  color: '#888',
                  bgcolor: '#fff',
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                Select a user to start chatting.
              </Box>
            )}
          </Box>
        </>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <>
          <Fade in={showChatList} timeout={300} unmountOnExit>
            <Box sx={{ flex: 1, height: '100%' }}>
              <ChatList />
            </Box>
          </Fade>

          <Fade in={!showChatList} timeout={300} unmountOnExit>
            <Box sx={{ flex: 1, height: '100%' }}>
              <ChatWindow />
            </Box>
          </Fade>
        </>
      )}
    </Box>
  );
}

export default ChatPage;
