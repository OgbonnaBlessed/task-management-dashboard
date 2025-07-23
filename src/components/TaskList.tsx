/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useTaskContext } from "@/context/TaskContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Task } from "@/context/taskTypes";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableTaskCard from "./SortableTaskCard";
import { Input } from "./ui/input";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

interface TaskListProps {
  filter: "all" | "completed" | "pending" | "overdue";
  title?: string;
  showHeader?: boolean;
}

const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.4,
            ease: [0.42, 0, 0.58, 1], // cubic-bezier for easeOut
        },
    }),
};

const TaskList: React.FC<TaskListProps> = ({ filter, title, showHeader = true }) => {
    const { tasks, dispatch } = useTaskContext();
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 5000,
                tolerance: 5,
            },
        })
    );

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

        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            updated = updated.filter(
            (t) =>
                t.title.toLowerCase().includes(term) ||
                t.description.toLowerCase().includes(term)
            );
        }

        setFilteredTasks(updated);
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [tasks, filter, dispatch, searchTerm]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = filteredTasks.findIndex((t) => t.id === active.id);
        const newIndex = filteredTasks.findIndex((t) => t.id === over.id);

        const newOrder = arrayMove(filteredTasks, oldIndex, newIndex);
        setFilteredTasks(newOrder);
        dispatch({ type: "REORDER_TASKS", payload: newOrder });
    };

    return (
        <>
            {loading && <LoadingSpinner />}
            <motion.div 
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto space-y-6"
            >
                {showHeader && (
                    <>
                        <motion.h1 
                            variants={fadeInUp} 
                            custom={0}
                            className="text-2xl font-bold"
                        >
                            {title}
                        </motion.h1>
                        <motion.div variants={fadeInUp} custom={1}>
                            <Input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search by title or description..."
                            />
                        </motion.div>
                    </>
                )}

                {filteredTasks.length === 0 ? (
                    <p className="text-muted-foreground text-center min-h-[24rem] flex items-center justify-center">
                        No task found
                    </p>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={filteredTasks.map((t) => t.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            <AnimatePresence>
                                {filteredTasks.map((task) => (
                                    <motion.div
                                        key={task.id}
                                        variants={fadeInUp} 
                                        custom={2}
                                    >
                                        <SortableTaskCard task={task} />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </SortableContext>
                    </DndContext>
                )}
            </motion.div>
        </>
    );
};

export default TaskList;