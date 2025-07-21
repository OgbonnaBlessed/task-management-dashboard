/* eslint-disable @typescript-eslint/no-explicit-any */
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

const EditTask = () => {
    const { id } = useParams();
    const { tasks, dispatch } = useTaskContext();
    const navigate = useNavigate();

    const task = tasks.find((t) => t.id === id);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState<"pending" | "completed" | "overdue">("pending");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
    const [dueDate, setDueDate] = useState("");

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

        if (!title || !description || !dueDate) {
            toast.error("Please fill in all fields.");
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

        dispatch({ type: "EDIT_TASK", payload: updatedTask });
            toast.success("Task updated successfully!");

            setTimeout(() => {
            navigate("/tasks");
        }, 1500);
    };

    if (!task) {
        return (
            <p className="text-center text-muted-foreground py-20">
                Task not found
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6">
            <div>
                <label className="block mb-2 text-sm font-medium">Title</label>
                <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                />
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Description</label>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block mb-2 text-sm font-medium">Status</label>
                    <Select value={status} onValueChange={(v) => setStatus(v as any)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium">Priority</label>
                    <Select value={priority} onValueChange={(v) => setPriority(v as any)}>
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
            </div>

            <div>
                <label className="block mb-2 text-sm font-medium">Due Date</label>
                <Input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>

            <Button 
                type="submit" 
                className="w-full cursor-pointer"
            >
                Save Changes
            </Button>
        </form>
    );
};

export default EditTask;