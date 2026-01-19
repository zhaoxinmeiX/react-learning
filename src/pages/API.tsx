import { useState, useEffect } from 'react';
import {
    Typography, Container, Box, Paper, Button, CircularProgress, Alert, List, ListItem, ListItemText, ListItemAvatar, Avatar
} from '@mui/material';
import NavButtons from '../components/NavButtons';

// Define the shape of the data we expect from the API
// 定义我们要从 API 获取的数据的形状
interface User {
    id: number;
    name: string;
    email: string;
    website: string;
}

// Consolidate states into a single object to prevent impossible states
interface FetchState<T> {
    data: T;
    loading: boolean;
    error: string | null;
}

/**
 * Module 7: API Interaction (接口交互)
 * 
 * Demonstrates how to fetch data from an external API using `fetch` and `useEffect`.
 * 演示如何使用 `fetch` 和 `useEffect` 从外部 API 获取数据。
 */
export default function API() {
    const [state, setState] = useState<FetchState<User[]>>({
        data: [],
        loading: false,
        error: null,
    });

    /**
     * Function to fetch users. Uses async/await.
     */
    const fetchUsers = async (signal?: AbortSignal) => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', { signal });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setState({ data, loading: false, error: null });
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                console.log('Fetch aborted');
                return;
            }
            setState(prev => ({
                ...prev,
                loading: false,
                error: err instanceof Error ? err.message : 'An error occurred'
            }));
        }
    };

    // Fetch data on component mount
    // 组件挂载时获取数据
    useEffect(() => {
        const controller = new AbortController();

        fetchUsers(controller.signal);

        // Cleanup: Abort fetch if component unmounts
        // 清理：如果组件卸载，则中止获取
        return () => {
            controller.abort();
        };
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Module 7: API Interaction (接口交互)
            </Typography>

            <Typography paragraph>
                Most React apps need to load data from a server. We standardly use <code>useEffect</code> to trigger the request and <code>useState</code> to store the result, loading status, and errors.
                大多数 React 应用程序需要从服务器加载数据。我们通常使用 <code>useEffect</code> 来触发请求，并使用 <code>useState</code> 来存储结果、加载状态和错误。
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">User List (from JSONPlaceholder)</Typography>
                    <Button variant="outlined" onClick={() => fetchUsers()} disabled={state.loading}>
                        Reload Data (刷新数据)
                    </Button>
                </Box>

                {/* 1. Loading State */}
                {/* 1. 加载状态 */}
                {state.loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* 2. Error State */}
                {/* 2. 错误状态 */}
                {state.error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        Error: {state.error}
                    </Alert>
                )}

                {/* 3. Data State */}
                {/* 3. 数据状态 */}
                {!state.loading && !state.error && (
                    <List sx={{ bgcolor: '#fff' }}>
                        {state.data.slice(0, 5).map((user) => (
                            <ListItem key={user.id} divider>
                                <ListItemAvatar>
                                    <Avatar>{user.name[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    secondary={
                                        <>
                                            <Typography component="span" variant="body2" color="text.primary">
                                                {user.email}
                                            </Typography>
                                            {" — " + user.website}
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>

            <Alert severity="info" variant="outlined">
                <strong>Pattern:</strong> Fetch &rarr; Set Loading &rarr; Await Data &rarr; Set Data &rarr; Unset Loading
                <br />
                <strong>模式：</strong> 获取 &rarr; 设置加载中 &rarr; 等待数据 &rarr; 设置数据 &rarr; 取消加载中
            </Alert>

            <NavButtons nextPath="/" nextLabel="Review Home (返回首页)" />
        </Container>
    );
}
