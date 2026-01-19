import React, { useState } from 'react';
import {
    Typography, Container, Button, Box, Paper, TextField, Divider
} from '@mui/material';
import { Add, Remove, RestartAlt } from '@mui/icons-material';
import { useLocalStorage } from '../hooks/useLocalStorage';
import NavButtons from '../components/NavButtons';

/**
 * Module 2: State Component (状态组件)
 */
export default function State() {
    // Standard useState (Resets on refresh)
    const [count, setCount] = useState<number>(0);

    // Custom useLocalStorage hook (Persists on refresh)
    // 使用自定义 hook 来持久化状态
    const [name, setName] = useLocalStorage<string>('user-name', '');

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Module 2: State Management (状态管理)
            </Typography>

            <Typography paragraph>
                State allows components to "remember" information and update the UI.
                状态允许组件“记住”信息并更新 UI。
            </Typography>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Example 1: Counter (计数器)</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h3" color="primary">{count}</Typography>
                    <Button variant="outlined" startIcon={<Remove />} onClick={() => setCount(count - 1)} disabled={count <= 0}>Decrease (减少)</Button>
                    <Button variant="contained" startIcon={<Add />} onClick={handleIncrement}>Increase (增加)</Button>
                    <Button color="error" startIcon={<RestartAlt />} onClick={() => setCount(0)}>Reset (重置)</Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>Example 2: Two-way Binding (双向绑定)</Typography>
                <TextField
                    label="Enter your name (输入你的名字)"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={handleNameChange}
                    helperText="Type something above to see the update below (在上面输入内容以查看下面的更新)"
                />
                <Box sx={{ mt: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 1 }}>
                    <Typography>Current State Value: <strong>{name || '(empty)'}</strong></Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                    Note: The name is saved in LocalStorage. Refresh the page to see!
                    <br />
                    注意：名字保存在本地存储中。刷新页面看看！
                </Typography>
            </Paper>

            <Divider sx={{ my: 4 }} />

            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Key Concepts (核心概念):</Typography>
                <Box component="ul">
                    <li>
                        <Typography variant="body2">
                            <strong>useState:</strong> Used for managing local component state.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body2">
                            <strong>Custom Hooks:</strong> Allow you to extract component logic into reusable functions.
                        </Typography>
                    </li>
                </Box>
            </Box>

            <NavButtons nextPath="/effects" nextLabel="3. Effects (副作用)" />
        </Container>
    );
}
