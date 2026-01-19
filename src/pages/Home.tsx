import { Box, Typography, Paper, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Home Component (首页组件)
 * 
 * This is the landing page of our application. It uses Material UI components
 * to create a welcoming introduction.
 * 
 * 这是我们应用程序的着陆页。它使用 Material UI 组件来创建一个受欢迎的介绍。
 */
export default function Home() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
                <Typography variant="h3" component="h1" gutterBottom color="primary">
                    Welcome to React Development
                </Typography>
                <Typography variant="h5" color="text.secondary" paragraph>
                    Interactive Course Edition
                </Typography>

                <Box sx={{ my: 3 }}>
                    <Typography variant="body1" paragraph>
                        Kia Ora! This application is designed to help you master React with TypeScript
                        and Material UI.
                    </Typography>

                    <Typography variant="body1" paragraph>
                        你好！这个应用程序旨在帮助你掌握 React、TypeScript 和 Material UI。
                    </Typography>
                </Box>

                <Typography variant="h6" gutterBottom>
                    What you will learn (你将学到什么):
                </Typography>

                <Box component="ul" sx={{ pl: 2, mb: 4 }}>
                    <li>
                        <Typography variant="body1">
                            <strong>Core Components:</strong> JSX, Props, and functional components.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            <strong>State Management:</strong> useState, complex state, and event handling.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            <strong>Effects:</strong> Component lifecycle and side effects with useEffect.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1">
                            <strong>Real-world Patterns:</strong> Forms, API calls, and custom Hooks.
                        </Typography>
                    </li>
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/basics')}
                >
                    Start Learning (开始学习)
                </Button>
            </Paper>
        </Container>
    );
}
