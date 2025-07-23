/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTaskContext } from "@/context/TaskContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskList from "@/components/shared/TaskList";
import { useEffect } from "react";

const Tasks = () => {
    const { filter, dispatch } = useTaskContext();

    const handleFilterChange = (value: string) => {
        dispatch({ type: "SET_FILTER", payload: value as any });
    };

    // Reset filter to 'all' when the Tasks page loads
    useEffect(() => {
        dispatch({ type: "SET_FILTER", payload: "all" });
    }, [dispatch]);

    return (
        <>
            <div className="max-w-4xl mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-6">Your Tasks</h1>
                <Select value={filter} onValueChange={handleFilterChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter tasks" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <TaskList filter={filter} showHeader={true} />
        </>
    );
};

export default Tasks;