import { useState } from 'react';

/**
 * useLocalStorage Hook (自定义 Hook: 本地存储)
 * 
 * A custom hook that persists state in the browser's localStorage.
 * 一个将状态持久化到浏览器 localStorage 的自定义钩子。
 * 
 * @param key - The key under which to store the data (存储数据的键)
 * @param initialValue - The initial value if no data is found (如果未找到数据，则使用初始值)
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
    // Pass initial state function to useState so logic is only executed once
    // 将初始状态函数传递给 useState，这样逻辑只会在初次渲染时执行一次
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage.
    const setValue = (value: T | ((val: T) => T)) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(error);
        }
    };

    return [storedValue, setValue] as const;
}
