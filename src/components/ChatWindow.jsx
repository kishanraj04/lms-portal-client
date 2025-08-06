import React from 'react';
import { Box, Typography, TextField, Button, Stack } from '@mui/material';

function ChatWindow({ selectedUser }) {
  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" gutterBottom>
        Chat with {selectedUser}
      </Typography>

      <Box sx={{ flexGrow: 1, bgcolor: '#f5f5f5', p: 2, borderRadius: 2, overflowY: 'auto' }}>
        {/* Dummy messages */}
        <Typography>Hi {selectedUser}</Typography>
        <Typography>How are you?</Typography>
      </Box>

      <Stack direction="row" spacing={1} mt={2}>
        <TextField fullWidth placeholder="Type your message..." />
        <Button variant="contained">Send</Button>
      </Stack>
    </Box>
  );
}

export default ChatWindow;
