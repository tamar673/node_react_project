import React, { useState, useEffect } from 'react';
import { IconButton, Box, Paper } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ImageIcon from '@mui/icons-material/Image';

const Home = () => {
  const [visibleLogin, setVisibleLogin] = useState(false)

  return (
    <Box sx={{ p: 2 }}>
      <Paper
        elevation={4}
        sx={{
          borderRadius: 30,
          background: 'linear-gradient(to right,rgb(2, 62, 91), #37474f)',
          p: 2,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <IconButton
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            width: 50,
            height: 50,
          }}
        >
          <ViewColumnIcon fontSize="large" />
        </IconButton>

        <IconButton
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            width: 50,
            height: 50,
          }}
        >
          <AccessTimeIcon fontSize="large" />
        </IconButton>

        <IconButton
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
            },
            width: 50,
            height: 50,
          }}
        >
          <ImageIcon fontSize="large" />
        </IconButton>
        <button onClick={setVisibleLogin(true)}>login</button>
      </Paper>
    </Box>
  );
};

export default Home;
