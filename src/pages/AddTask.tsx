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

const AddTask = () => {
    const { dispatch } = useTaskContext()
    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState<"pending" | "completed" | "overdue">("pending")
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
    const [dueDate, setDueDate] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!title || !description || !dueDate) {
            toast.error("Kindly fill all fields")
            return
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

        dispatch({ type: "ADD_TASK", payload: newTask })
        toast.success("Task added successfully")

        // Reset form
        setTitle("")
        setDescription("")
        setStatus("pending")
        setPriority("medium")
        setDueDate("")

        setTimeout(() => {
            navigate('/tasks');
        }, 2000);
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
                    <Select value={status} onValueChange={(v) => setStatus(v as "pending" | "completed" | "overdue")}>
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
                Add Task
            </Button>
        </form>
    )
}

export default AddTask