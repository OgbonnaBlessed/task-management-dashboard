import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import TaskCard from "@/components/TaskCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Task } from "@/context/taskTypes";

interface TaskListProps {
  filter: "all" | "completed" | "pending" | "overdue";
  title: string;
}

const TaskList: React.FC<TaskListProps> = ({ filter, title }) => {
    const { tasks, dispatch } = useTaskContext();
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch({ type: "SET_FILTER", payload: filter });

        const timer = setTimeout(() => {
        const today = new Date().toISOString().split("T")[0];

        let updated = [...tasks];

        if (filter === "completed") {
            updated = updated.filter((t) => t.status === "completed");
        } else if (filter === "pending") {
            updated = updated.filter((t) => t.status === "pending");
        } else if (filter === "overdue") {
            updated = updated.filter((t) => t.status === "pending" && t.dueDate < today);
        }

        setFilteredTasks(updated);
            setLoading(false);
        }, 5000); // simulate 5s loading

        return () => clearTimeout(timer);
    }, [tasks, filter, dispatch]);

    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
            <h1 className="text-2xl font-bold">{title}</h1>

            {loading ? (
                <LoadingSpinner />
            ) : filteredTasks.length === 0 ? (
                <p className="text-muted-foreground text-center min-h-[24rem] flex items-center justify-center">
                    No task found
                </p>
            ) : (
                filteredTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                ))
            )}
        </div>
    );
};

export default TaskList;