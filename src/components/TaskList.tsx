/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Task } from "@/context/taskTypes";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import SortableTaskCard from "./SortableTaskCard"; // <-- Create this wrapper component

interface TaskListProps {
  filter: "all" | "completed" | "pending" | "overdue";
  title?: string;
  showHeader?: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ filter, title, showHeader = true }) => {
    const { tasks, dispatch } = useTaskContext();
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    const sensors = useSensors(useSensor(PointerSensor));

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
        }, 500);

        return () => clearTimeout(timer);
    }, [tasks, filter, dispatch]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = filteredTasks.findIndex((t) => t.id === active.id);
        const newIndex = filteredTasks.findIndex((t) => t.id === over.id);

        const newOrder = arrayMove(filteredTasks, oldIndex, newIndex);
        setFilteredTasks(newOrder); // local update
        dispatch({ type: "REORDER_TASKS", payload: newOrder }); // global update
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                {showHeader && <h1 className="text-2xl font-bold">{title}</h1>}
                {filteredTasks.length === 0 ? (
                    <p className="text-muted-foreground text-center min-h-[24rem] flex items-center justify-center">
                        No task found
                    </p>
                ) : (
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={filteredTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                            {filteredTasks.map((task) => (
                                <SortableTaskCard key={task.id} task={task} />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </>
    );
};

export default TaskList;