import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';
// import './index.css'; // Removed default styles to rely on MUI

// Create a custom theme (optional but good practice)
// 创建自定义主题（可选，但推荐）
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Standard MUI Blue
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
