import { createContext, useContext, useEffect, useReducer } from 'react';
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

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Load from localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            dispatch({ type: 'LOAD_TASKS', payload: JSON.parse(savedTasks) });
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(state.tasks));
    }, [state.tasks]);

    return (
        <TaskContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TaskContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
}