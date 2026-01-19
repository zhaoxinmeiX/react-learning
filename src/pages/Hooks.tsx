import { useReducer, useMemo, useState, useCallback, memo } from 'react';
import {
    Typography, Container, Box, Paper, Button, List, ListItem, ListItemText, TextField, Divider
} from '@mui/material';
import NavButtons from '../components/NavButtons';

// 1. Reducer State and Action Types
// 1. Reducer 状态和动作类型
interface State {
    count: number;
}

type Action =
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' };

/**
 * Reducer Function
 * Reducer 函数
 * 
 * Takes current state and an action, returns new state.
 * 接收当前状态和一个动作，返回新状态。
 */
function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return { count: 0 };
        default:
            return state;
    }
}

/**
 * Memoized Child Component (已记忆的子组件)
 * 
 * Using `memo` prevents this component from re-rendering unless its props change.
 * 使用 `memo` 防止此组件在 props 未更改时重新渲染。
 */
const FilterStatistics = memo(({ count }: { count: number }) => {
    console.log('FilterStatistics: Re-rendering... (子组件重新渲染)');
    return (
        <Box sx={{ mt: 1, color: 'text.secondary' }}>
            <Typography variant="caption">Matches found: {count}</Typography>
        </Box>
    );
});

/**
 * Module 6: Advanced Hooks (高级钩子)
 * 
 * Demonstrates `useReducer` for complex state logic and `useMemo` for performance optimization.
 * 演示用于复杂状态逻辑的 `useReducer` 和用于性能优化的 `useMemo`。
 */
export default function Hooks() {
    // useReducer usage
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    // useMemo usage setup
    const [items] = useState<string[]>([
        'Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig', 'Grape'
    ]);
    const [filter, setFilter] = useState('');

    /**
     * MEMOIZATION EXPLANATION:
     * 
     * `filteredItems` is re-calculated ONLY when `items` or `filter` changes.
     * If the component re-renders for other reasons (like the counter changing), this calculation is skipped.
     * 
     * `filteredItems` 仅当 `items` 或 `filter` 改变时才重新计算。
     * 如果组件因其他原因（如计数器变化）重新渲染，则跳过此计算。
     */
    const filteredItems = useMemo(() => {
        console.log('Filtering items... (Running expensive calculation)');
        return items.filter(item => item.toLowerCase().includes(filter.toLowerCase()));
    }, [items, filter]);

    /**
     * CALLBACK EXPLANATION:
     * 
     * `handleClear` is memoized. It will NOT be recreated on every render.
     * This is useful when passing functions to memoized child components.
     * 
     * `handleClear` 被记忆。它不会在每次渲染时都被重新创建。
     * 当将函数传递给被记忆的子组件时，这非常有用。
     */
    const handleClear = useCallback(() => {
        setFilter('');
    }, []);

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Module 6: Advanced Hooks (高级钩子)
            </Typography>

            {/* Section 1: useReducer */}
            <Paper sx={{ p: 3, mb: 4 }}>
                <Typography variant="h6" gutterBottom>1. useReducer</Typography>
                <Typography paragraph>
                    An alternative to `useState` for complex state logic. It follows the Redux pattern.
                    `useState` 的替代方案，用于处理复杂的状态逻辑。它遵循 Redux 模式。
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Typography variant="h4">{state.count}</Typography>
                    <Button variant="outlined" onClick={() => dispatch({ type: 'decrement' })}>-</Button>
                    <Button variant="contained" onClick={() => dispatch({ type: 'increment' })}>+</Button>
                    <Button color="error" onClick={() => dispatch({ type: 'reset' })}>Reset</Button>
                </Box>
            </Paper>

            <Divider sx={{ my: 4 }} />

            {/* Section 2: useMemo */}
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>2. useMemo (Performance)</Typography>
                <Typography paragraph>
                    Memoizes expensive calculations. Open console to see when filtering happens.
                    缓存昂贵的计算结果。打开控制台查看过滤何时发生。
                </Typography>

                <TextField
                    label="Filter Fruits (过滤水果)"
                    fullWidth
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    sx={{ mb: 1 }}
                />

                <Button size="small" onClick={handleClear} sx={{ mb: 2 }}>
                    Clear Filter
                </Button>

                <FilterStatistics count={filteredItems.length} />

                <List dense sx={{ bgcolor: '#eee', borderRadius: 1, mt: 1 }}>
                    {filteredItems.map((item, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={item} />
                        </ListItem>
                    ))}
                </List>
            </Paper>

            <NavButtons nextPath="/api" nextLabel="7. API (接口)" />
        </Container>
    );
}
