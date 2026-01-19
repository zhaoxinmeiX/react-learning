import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from '@mui/icons-material';

/**
 * NotFound Page (404 页面)
 * 
 * Displayed when a user navigates to a URL that doesn't exist.
 * 当用户导航到不存在的 URL 时显示。
 */
export default function NotFound() {
    const navigate = useNavigate();

    return (
        <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 10 }}>
            <Typography variant="h1" color="primary" sx={{ fontWeight: 'bold' }}>
                404
            </Typography>
            <Typography variant="h4" gutterBottom>
                Oops! Page Not Found
                <br />
                (糟糕！页面未找到)
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
                The page you are looking for might have been removed or is temporarily unavailable.
                <br />
                你寻找的页面可能已被移除或暂时不可用。
            </Typography>
            <Box sx={{ mt: 4 }}>
                <Button
                    variant="contained"
                    startIcon={<HomeIcon />}
                    onClick={() => navigate('/')}
                    size="large"
                >
                    Back to Home (返回首页)
                </Button>
            </Box>
        </Container>
    );
}
