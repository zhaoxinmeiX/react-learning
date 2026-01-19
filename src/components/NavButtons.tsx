import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowForward, Home as HomeIcon } from '@mui/icons-material';

interface NavButtonsProps {
    nextPath: string;
    nextLabel: string;
}

/**
 * NavButtons Component (导航按钮组件)
 * 
 * Provides a button to go to the next module and optionally back to home.
 * 提供了前往下一模块的按钮，以及可选的返回首页选项。
 */
export default function NavButtons({ nextPath, nextLabel }: NavButtonsProps) {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                mt: 6,
                mb: 4,
                pt: 3,
                borderTop: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 2
            }}
        >
            <Button
                variant="outlined"
                startIcon={<HomeIcon />}
                onClick={() => navigate('/')}
            >
                Back to Home (返回首页)
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2" color="text.secondary">
                    Next Up (下一章):
                </Typography>
                <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate(nextPath)}
                    sx={{ px: 4 }}
                >
                    {nextLabel}
                </Button>
            </Box>
        </Box>
    );
}
