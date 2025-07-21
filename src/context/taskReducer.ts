import type { TaskState, TaskAction } from './taskTypes';

export const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
    switch (action.type) {
        case 'LOAD_TASKS':
            return { ...state, tasks: action.payload };
        case 'ADD_TASK':
            return { ...state, tasks: [action.payload, ...state.tasks] };
        case 'EDIT_TASK':
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
            };
        case 'DELETE_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
        case 'TOGGLE_STATUS':
            return {
                ...state,
                tasks: state.tasks.map(task =>
                task.id === action.payload ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
                ),
            };
        case 'SET_FILTER':
            return { ...state, filter: action.payload };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        default:
            return state;
    }
};