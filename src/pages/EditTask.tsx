import { useParams, useNavigate } from "react-router-dom";
import { useTaskContext } from "@/context/TaskContext";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Button as ShadButton } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

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

const EditTask = () => {
    const { id } = useParams();
    const { tasks, dispatch } = useTaskContext();
    const navigate = useNavigate();

    const task = tasks.find((t) => t.id === id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"pending" | "completed">("pending");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
    const [dueDate, setDueDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
            setPriority(task.priority);
            setDueDate(task.dueDate);
        }
    }, [task]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!title || !description || !dueDate) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (!title.trim() || !description.trim()) {
            toast.error("All fields must be properly filled");
            return;
        }

        if (
            title === task!.title &&
            description === task!.description &&
            status === task!.status &&
            priority === task!.priority &&
            dueDate === task!.dueDate
        ) {
            toast.error("No changes were made to the task");
            return;
        }

        const taskExists = tasks.some(
            (t) => t.id !== task!.id && t.title === title && t.dueDate === dueDate
        );

        if (taskExists) {
            toast.error("A task with the same title and due date already exists");
            return;
        }

        if (title.length > 50) {
            toast.error("Title is too long (max 50 characters)");
            return;
        }

        if (description.length > 200) {
            toast.error("Description is too long (max 200 characters)");
            return;
        }

        const updatedTask = {
            ...task!,
            title,
            description,
            status,
            priority,
            dueDate,
        };

        setIsSubmitting(true);
        dispatch({ type: "EDIT_TASK", payload: updatedTask });
        setTimeout(() => {
            toast.success("Task updated successfully!");
        }, 1500);

        setTimeout(() => {
            setIsSubmitting(false);
        }, 1700);
        setTimeout(() => {
            navigate("/tasks");
        }, 2000);
    };

    if (!task) {
        return (
            <p className="text-center text-muted-foreground py-20">
                Task not found
            </p>
        );
    }

    return (
        <motion.form 
            onSubmit={handleSubmit} 
            className="max-w-xl mx-auto space-y-6"
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={fadeInUp} custom={0}>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />
            </motion.div>

            <motion.div variants={fadeInUp} custom={1}>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />
            </motion.div>

            <motion.div 
                className="grid grid-cols-2 gap-4"
                variants={fadeInUp}
                custom={2}
            >
                <div>
                    <label className="block mb-2 text-sm font-medium">Status</label>
                    <Select
                        value={status}
                        onValueChange={(v) => setStatus(v as "pending" | "completed")}
                    >
                        <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">Priority</label>
                    <Select
                        value={priority}
                        onValueChange={(v) => setPriority(v as "low" | "medium" | "high")}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </motion.div>

            <motion.div variants={fadeInUp} custom={3}>
                <label className="block mb-2 text-sm font-medium">Due Date</label>
                <Popover>
                    <PopoverTrigger asChild>
                        <ShadButton
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-left font-normal",
                                !dueDate && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dueDate ? format(new Date(dueDate), "PPP") : "Pick a date"}
                        </ShadButton>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={dueDate ? new Date(dueDate) : undefined}
                            onSelect={(date) => {
                                if (date) {
                                    const localDate = date.toLocaleDateString("en-CA"); // Ensures correct date
                                    setDueDate(localDate);
                                }
                            }}
                            disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                        />
                    </PopoverContent>
                </Popover>
            </motion.div>

            <motion.div variants={fadeInUp} custom={4}>
                <Button
                    type="submit"
                    className="w-full cursor-pointer"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving Changes...
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </Button>
            </motion.div>
        </motion.form>
    );
};

export default EditTask;