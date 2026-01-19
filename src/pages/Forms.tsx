import React, { useState } from 'react';
import {
    Typography,
    Container,
    Box,
    TextField,
    Button,
    Paper,
    Alert,
    Stack
} from '@mui/material';
import NavButtons from '../components/NavButtons';

// Define the shape of our form data object
// 定义表单数据对象的结构
interface FormData {
    firstName: string;
    email: string;
    message: string;
}

/**
 * Module 4: Forms (表单)
 * 
 * Demonstrates how to handle user inputs, "Controlled Components", and form submission.
 * 演示如何处理用户输入、“受控组件”以及表单提交。
 */
export default function Forms() {
    // Use a single state object for multiple fields (common pattern)
    // 使用单个状态对象来管理多个字段（常见模式）
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        email: '',
        message: ''
    });

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

    /**
     * Validation logic
     * 验证逻辑
     */
    const validate = (): boolean => {
        const newErrors: Partial<Record<keyof FormData, string>> = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required (必填项目)';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required (必填项目)';
        } else if (!formData.email.includes('@')) {
            newErrors.email = 'Please enter a valid email (请输入有效的电子邮件)';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message cannot be empty (留言不能为空)';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    /**
     * Generic input handler
     * 通用输入处理函数
     * 
     * This function works for any text input field by using the 'name' attribute.
     * 此函数通过使用 'name' 属性适用于任何文本输入字段。
     */
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Spread previous state and update only the changed field
        // 展开之前的状态并仅更新更改的字段
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Prevent full page reload (防止页面完全重新加载)

        if (validate()) {
            // Process data (e.g., send to API)
            console.log('Form Submitted:', formData);
            setSubmitted(true);
            setErrors({});
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Module 4: Forms (表单)
            </Typography>

            <Typography paragraph>
                In React, we typically use "Controlled Components", where the React state acts as the single source of truth for the input value.
                在 React 中，我们通常使用“受控组件”，其中 React 状态充当输入值的唯一数据源。
            </Typography>

            <Paper sx={{ p: 4, mt: 3 }}>
                {submitted ? (
                    <Alert severity="success" onClose={() => setSubmitted(false)}>
                        Thank you, {formData.firstName}! We received your message.
                        <br />
                        (谢谢你，{formData.firstName}！我们收到了你的消息。)
                    </Alert>
                ) : (
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Stack spacing={3}>
                            <Typography variant="h6">Contact Us (联系我们)</Typography>

                            <TextField
                                label="First Name (名字)"
                                name="firstName"
                                required
                                fullWidth
                                value={formData.firstName}
                                onChange={handleChange}
                                error={!!errors.firstName}
                                helperText={errors.firstName}
                            />

                            <TextField
                                label="Email (电子邮件)"
                                name="email"
                                type="email"
                                required
                                fullWidth
                                value={formData.email}
                                onChange={handleChange}
                                error={!!errors.email}
                                helperText={errors.email}
                            />

                            <TextField
                                label="Message (留言)"
                                name="message"
                                multiline
                                rows={4}
                                fullWidth
                                value={formData.message}
                                onChange={handleChange}
                                error={!!errors.message}
                                helperText={errors.message}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                disabled={!formData.firstName || !formData.email}
                            >
                                Submit Form (提交表单)
                            </Button>
                        </Stack>
                    </Box>
                )}
            </Paper>

            <Box sx={{ mt: 4 }}>
                <Typography variant="h6">Key Patterns (核心模式):</Typography>
                <Paper sx={{ p: 2, mt: 1, bgcolor: '#f8f9fa' }}>
                    <Typography variant="subtitle2" gutterBottom>Controlled Input Pattern:</Typography>
                    <code style={{ display: 'block', whiteSpace: 'pre-wrap' }}>
                        {`<input 
  value={state} 
  onChange={e => setState(e.target.value)} 
/>`}
                    </code>
                </Paper>
            </Box>

            <NavButtons nextPath="/context" nextLabel="5. Context (上下文)" />
        </Container>
    );
}
