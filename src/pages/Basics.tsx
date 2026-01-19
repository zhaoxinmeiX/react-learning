import { Typography, Paper, Box, Container, Chip, Stack } from '@mui/material';
import NavButtons from '../components/NavButtons';

/**
 * Interface defining the Props (Properties) for our demo component.
 * 定义演示组件的 Props（属性）接口。
 * 
 * In TypeScript, we use interfaces to define the shape of objects.
 * 在 TypeScript 中，我们使用接口来定义对象的形状。
 */
interface GreetingProps {
    name: string;        // A required string prop (必填字符串属性)
    role?: string;       // An optional string prop (可选字符串属性)
    yearsExperience: number; // A required number prop (必填数字属性)
}

/**
 * Reusable child component for showing user info
 */
const UserCard = ({ name, role = 'Developer', yearsExperience }: GreetingProps) => {
    // JSX (JavaScript XML) allows us to write HTML-like code in JavaScript.
    // JSX 允许我们在 JavaScript 中编写类似 HTML 的代码。
    return (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
            <Typography variant="h6">
                Hello, I am {name}! {/* Using curly braces to embed variables using JS expression */}
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Role: {role}
            </Typography>

            <Box sx={{ mt: 1 }}>
                <Typography variant="body2">
                    Experience: {yearsExperience} years
                </Typography>

                {/* Conditional Rendering using ternary operator */}
                {/* 使用三元运算符进行条件渲染 */}
                <Chip
                    label={yearsExperience > 2 ? "Senior (资深)" : "Junior (初级)"}
                    color={yearsExperience > 2 ? "primary" : "default"}
                    size="small"
                    sx={{ mt: 1 }}
                />
            </Box>
        </Paper>
    );
};

/**
 * Module 1: Basics Page (基础模块页面)
 * 
 * This page demonstrates how to use components and pass props.
 * 这个页面演示了如何使用组件和传递属性。
 */
export default function Basics() {
    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Module 1: Components & Props (组件与属性)
            </Typography>

            <Typography paragraph>
                React applications are built from isolated pieces of code called "components".
                React 应用程序由称为“组件”的独立代码片段构建而成。
            </Typography>

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Example 1: Reusing Components (复用组件)
            </Typography>
            <Typography paragraph>
                Below we use the same <code>&lt;GreetingCard /&gt;</code> component multiple times with different data (Props).
                下面我们就用同一个 <code>&lt;GreetingCard /&gt;</code> 组件多次，传入不同的数据（Props）。
            </Typography>

            <Box sx={{ my: 3 }}>
                <UserCard
                    name="Alice"
                    role="Frontend Lead"
                    yearsExperience={5}
                />

                <UserCard
                    name="Bob"
                    yearsExperience={1}
                />

                <UserCard
                    name="Charlie"
                    role="Product Manager"
                    yearsExperience={8}
                />
            </Box>

            <Typography variant="h6" gutterBottom>
                Key Concepts (核心概念):
            </Typography>

            <Stack spacing={2}>
                <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Typography variant="subtitle1" fontWeight="bold">1. Component (组件)</Typography>
                    <Typography variant="body2">
                        A function that returns UI elements. It must start with a capital letter.
                        <br />
                        返回 UI 元素的函数。它必须以大写字母开头。
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Typography variant="subtitle1" fontWeight="bold">2. Props (属性)</Typography>
                    <Typography variant="body2">
                        Read-only inputs passed to components, like function arguments.
                        <br />
                        传递给组件的只读输入，类似于函数参数。
                    </Typography>
                </Paper>

                <Paper sx={{ p: 2, bgcolor: '#f8f9fa' }}>
                    <Typography variant="subtitle1" fontWeight="bold">3. Interface (接口)</Typography>
                    <Typography variant="body2">
                        In TypeScript, we define what props a component expects to ensure type safety.
                        <br />
                        在 TypeScript 中，我们要定义组件期望接收哪些 props，以确保类型安全。
                    </Typography>
                </Paper>
            </Stack>

            <NavButtons nextPath="/state" nextLabel="2. State (状态管理)" />
        </Container>
    );
}
