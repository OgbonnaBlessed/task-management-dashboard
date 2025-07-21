/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTaskContext } from "@/context/TaskContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { Task } from "@/context/taskTypes";
import TaskCard from "@/components/TaskCard";

const Tasks = () => {
    const { tasks, dispatch, filter } = useTaskContext();
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

    useEffect(() => {
    const today = new Date().toISOString().split("T")[0];

    let updated = [...tasks];

    if (filter === "completed") {
        updated = updated.filter((t) => t.status === "completed");
    } else if (filter === "pending") {
        updated = updated.filter((t) => t.status === "pending");
    } else if (filter === "overdue") {
        updated = updated.filter((t) => t.status === "pending" && t.dueDate < today);
    } else {
        // 👇 This handles the "all" case
        updated = [...tasks];
    }

    setFilteredTasks(updated);
    }, [filter, tasks]);

    const handleFilterChange = (value: string) => {
        dispatch({ type: "SET_FILTER", payload: value as any });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Your Tasks</h1>
                <Select 
                    value={filter} 
                    onValueChange={handleFilterChange}
                >
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

            {filteredTasks.length === 0 ? (
                <p className="text-muted-foreground text-center flex items-center justify-center min-h-[24rem]">
                    No task found
                </p>
            ) : (
                filteredTasks.map((task) => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                    />
                ))
            )}
        </div>
    );
};

export default Tasks;