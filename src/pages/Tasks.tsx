/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTaskContext } from "@/context/TaskContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TaskList from "@/components/TaskList";

const Tasks = () => {
    const { filter, dispatch } = useTaskContext();

    const handleFilterChange = (value: string) => {
        dispatch({ type: "SET_FILTER", payload: value as any });
    };

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

            <TaskList filter={filter} showHeader={false} />
        </>
    );
};

export default Tasks;