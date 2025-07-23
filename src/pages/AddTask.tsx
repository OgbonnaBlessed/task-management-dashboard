import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useTaskContext } from "@/context/TaskContext"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from "uuid";
import { Loader2 } from "lucide-react"
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

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

const AddTask = () => {
    const { tasks, dispatch } = useTaskContext()
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<"pending" | "completed">("pending")
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
    const [dueDate, setDueDate] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmitting) return;

        if (!title || !description || !dueDate) {
            toast.error("Kindly fill all fields")
            return
        }

        if (!title.trim() || !description.trim()) {
            toast.error("All fields must be properly filled");
            return;
        }

        // Check if task with same title and due date exists
        const taskExists = tasks.some(
            (task) => task.title === title && task.dueDate === dueDate
        );

        if (taskExists) {
            toast.error("A task with the same title and due date already exist");
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

        const newTask = {
            id: uuidv4(),
            title,
            description,
            status,
            priority,
            dueDate,
            createdAt: new Date().toISOString(),
        }

        setIsSubmitting(true);
        dispatch({ type: "ADD_TASK", payload: newTask })
        setTimeout(() => {
            toast.success("Task added successfully");
        }, 1500);

        // Reset form
        setTitle("")
        setDescription("")
        setStatus("pending")
        setPriority("medium")
        setDueDate("")

        setTimeout(() => {
            setIsSubmitting(false);
        }, 1700);
        setTimeout(() => {
            navigate('/tasks');
        }, 2000);
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
                <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                />
            </motion.div>

            <motion.div variants={fadeInUp} custom={4}>
                <Button 
                    type="submit" 
                    className="w-full cursor-pointer"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Adding Task...
                        </>
                    ) : (
                        "Add Task"
                    )}
                </Button>
            </motion.div>
        </motion.form>
    )
}

export default AddTask