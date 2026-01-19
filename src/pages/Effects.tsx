import { useState, useEffect } from 'react';
import { Typography, Container, Button, Paper, Alert, CircularProgress } from '@mui/material';
import NavButtons from '../components/NavButtons';

/**
 * Module 3: Effects (副作用)
 * 
 * Demonstrates the `useEffect` hook for handling side effects like data fetching,
 * subscriptions, or manually changing the DOM.
 * 演示用于处理副作用（如数据获取、订阅或手动更改 DOM）的 `useEffect` 钩子。
 */
export default function Effects() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [loading, setLoading] = useState(true);

    // Example 1: Effect on every render (rarely used without dependency array)
    // 示例 1: 每次渲染时执行 (如果不加依赖数组，很少这么用)
    useEffect(() => {
        document.title = `Count: ${count}`;
        // This runs after every render.
        // 这会在每次渲染后运行。
    });

    // Example 2: Effect with empty dependency array (runs once on mount)
    // 示例 2: 空依赖数组 (仅在挂载时运行一次)
    useEffect(() => {
        console.log('Component Mounted (组件已挂载)');

        // Simulate an API call
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Cleanup function (runs on unmount)
        // 清理函数 (在卸载时运行)
        return () => {
            console.log('Component Unmounted (组件已卸载)');
            clearTimeout(timer);
        };
    }, []); // [] means run only once

    // Example 3: Effect with dependencies
    // 示例 3: 带依赖的 Effect
    useEffect(() => {
        // This runs only when 'count' changes
        // 仅当 'count' 改变时运行
        console.log(`Count updated to ${count}`);
    }, [count]);

    // Example 4: Clock (Interval)
    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Module 3: Effects (副作用)
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6">1. Lifecycle Simulation (生命周期模拟)</Typography>
                <Typography paragraph>
                    This component demonstrates loading states and cleanup. Refreshes title based on count.
                    此组件演示加载状态和清理。根据计数刷新标题。
                </Typography>

                {loading ? (
                    <Alert severity="info" icon={<CircularProgress size={20} />}>
                        Loading data... (Wait 2 seconds)
                    </Alert>
                ) : (
                    <Alert severity="success">
                        Data loaded! (数据已加载)
                    </Alert>
                )}
            </Paper>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6">2. Dependency Array (依赖数组)</Typography>
                <Typography>Count: {count}</Typography>
                <Button variant="contained" onClick={() => setCount(c => c + 1)} sx={{ mt: 1 }}>
                    Increment & Update Title
                </Button>
            </Paper>

            <Paper sx={{ p: 3 }}>
                <Typography variant="h6">3. Timer (Updating State)</Typography>
                <Typography variant="h3">{time}</Typography>
            </Paper>

            <NavButtons nextPath="/forms" nextLabel="4. Forms (表单)" />
        </Container>
    );
}
