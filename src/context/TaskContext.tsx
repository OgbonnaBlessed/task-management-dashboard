/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from 'react';
import type { TaskAction, TaskState } from './taskTypes';
import { taskReducer } from './taskReducer';

interface TaskContextProps extends TaskState {
  dispatch: React.Dispatch<TaskAction>;
}

const initialState: TaskState = {
  tasks: [],
  filter: 'all',
  loading: false,
  error: null,
};

const TaskContext = createContext<TaskContextProps | undefined>(undefined);

// Load initial state from localStorage
const initializer = (): TaskState => {
    const savedTasks = localStorage.getItem('tasks');
    return {
        ...initialState,
        tasks: savedTasks ? JSON.parse(savedTasks) : [],
    };
};

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState, initializer);

    // Save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }, [state.tasks]);

    return (
        <TaskContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

// Custom hook to use the Task context
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};