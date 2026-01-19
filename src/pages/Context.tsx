import { useState, useContext, createContext } from 'react';
import {
    Typography, Container, Box, Paper, Switch, FormControlLabel
} from '@mui/material';
import NavButtons from '../components/NavButtons';

// 1. Define the shape of the context
// 1. 定义上下文的形状
interface ThemeContextType {
    darkMode: boolean;
    toggleTheme: () => void;
}

// 2. Create the Context with a default value
// 2. 创建上下文并提供一个默认值
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * A simpler child component that consumes the context
 * 一个使用上下文的简单子组件
 */
const ThemedCard = () => {
    // 4. Consume the context using the hook
    // 4. 使用钩子消费上下文
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('ThemedCard must be used within a ThemeProvider');
    }

    const { darkMode } = context;

    return (
        <Paper
            sx={{
                p: 3,
                mt: 2,
                bgcolor: darkMode ? '#424242' : '#fff',
                color: darkMode ? '#fff' : '#000',
                transition: 'all 0.3s ease'
            }}
        >
            <Typography variant="h6">I am a Themed Component (我是主题组件)</Typography>
            <Typography>
                My style changes based on the global context value, without passing props down manually.
                我的样式基于全局上下文值而变化，无需手动向下传递 props。
            </Typography>
        </Paper>
    );
};

/**
 * Module 5: Context (上下文)
 * 
 * Demonstrates how to share state across the entire component tree without "prop drilling".
 * 演示如何在整个组件树中共享状态，而无需“属性逐层传递”。
 */
export default function ContextModule() {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Module 5: Context (上下文)
            </Typography>

            <Typography paragraph>
                Context provides a way to pass data through the component tree without having to pass props down manually at every level.
                Context 提供了一种在组件树中传递数据的方法，而无需在每个级别手动传递 props。
            </Typography>

            {/* 3. Provide the Context value to children */}
            {/* 3. 向子组件提供 Context 值 */}
            <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
                <Paper sx={{ p: 4, bgcolor: '#f5f5f5' }}>
                    <Typography variant="h6" gutterBottom>
                        Context Provider (Parent Area)
                    </Typography>

                    <FormControlLabel
                        control={<Switch checked={darkMode} onChange={toggleTheme} />}
                        label="Toggle Global Theme (切换全局主题)"
                    />

                    <Box sx={{ mt: 3, p: 2, border: '1px dashed grey' }}>
                        <Typography variant="caption" display="block" gutterBottom>
                            Nested Child Area (No props passed here!)
                        </Typography>
                        <ThemedCard />
                    </Box>
                </Paper>
            </ThemeContext.Provider>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Three Steps (三个步骤):</Typography>
                <Box component="ol">
                    <li>
                        <Typography><strong>Create:</strong> <code>const MyContext = createContext()</code></Typography>
                    </li>
                    <li>
                        <Typography><strong>Provide:</strong> <code>&lt;MyContext.Provider value=...&gt;</code></Typography>
                    </li>
                    <li>
                        <Typography><strong>Consume:</strong> <code>useContext(MyContext)</code></Typography>
                    </li>
                </Box>
            </Box>

            <NavButtons nextPath="/hooks" nextLabel="6. Hooks (高级钩子)" />
        </Container>
    );
}
