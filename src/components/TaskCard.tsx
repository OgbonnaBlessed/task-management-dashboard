/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useTaskContext } from "@/context/TaskContext"
import { format } from "date-fns"
import { toast } from "sonner"
import type { Task } from "@/context/taskTypes"
import { Link } from "react-router-dom"
import { GripVertical } from "lucide-react"

interface TaskCardProps {
  task: Task;
  dragAttributes?: any;
  dragListeners?: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, dragAttributes, dragListeners }) => {
    const { dispatch } = useTaskContext();

    const today = new Date().toISOString().split("T")[0];
    const isOverdue = task.status === "pending" && task.dueDate < today;

    const toggleStatus = () => {
        dispatch({ type: "TOGGLE_STATUS", payload: task.id });
        toast.success("Task status updated");
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE_TASK", payload: task.id });
        toast.success("Task deleted");
    };

    return (
        <Card className="transition-all">
            <CardHeader className="flex md:flex-row flex-col-reverse max-md:gap-2 justify-between items-start">
                <div className="flex items-start gap-2">
                    {/* Drag Handle */}
                    <div
                        className="touch-none cursor-grab active:cursor-grabbing p-1 rounded hover:bg-muted"
                        {...(dragListeners ?? {})}
                        {...(dragAttributes ?? {})}
                    >
                        <GripVertical className="w-4 h-4 text-muted-foreground" />
                    </div>

                    {/* Title + Desc */}
                    <div>
                        <CardTitle>{task.title}</CardTitle>
                        <p className="text-sm text-muted-foreground break-words whitespace-pre-wrap max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md">
                            {task.description}
                        </p>
                    </div>
                </div>

                <Badge 
                    variant={
                        task.status === "completed" 
                            ? "default" 
                            : isOverdue     
                                ? "destructive" 
                                : "secondary"
                    }
                    className="max-md:self-end"
                >
                    {task.status === "completed" ? "Completed" : isOverdue ? "Overdue" : "Pending"}
                </Badge>
            </CardHeader>

            <CardContent className="flex md:flex-row flex-col max-md:gap-2 justify-between md:items-center items-start">
                <div className="text-sm text-muted-foreground">
                    Due: {format(new Date(task.dueDate), "PPP")}
                </div>

                <div className="flex gap-2">
                    <Toggle
                        pressed={task.status === "completed"}
                        onPressedChange={toggleStatus}
                        aria-label="Toggle Task Status"
                        className="cursor-pointer"
                    >
                        {task.status === "completed" ? "✓ Done" : "Mark Done"}
                    </Toggle>

                    <Link to={`/edit/${task.id}`}>
                        <Button variant="outline" size="sm" className="cursor-pointer">
                            Edit
                        </Button>
                    </Link>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="cursor-pointer">
                                Delete
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. The task <strong>{task.title}</strong> will be permanently deleted.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete} className="cursor-pointer">
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    );
};

export default TaskCard;