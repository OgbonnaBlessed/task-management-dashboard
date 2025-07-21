import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Toggle } from "@/components/ui/toggle"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog"
import { useTaskContext } from "@/context/TaskContext"
import { format } from "date-fns"
import { toast } from "sonner"
import type { Task } from "@/context/taskTypes"

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { dispatch } = useTaskContext();

    const today = new Date().toISOString().split("T")[0];
    const isOverdue = task.status === "pending" && task.dueDate < today;

    const toggleStatus = () => {
        dispatch({ type: "TOGGLE_STATUS", payload: task.id });
        toast.success("Task status updated");
    }

    const handleDelete = () => {
        dispatch({ type: "DELETE_TASK", payload: task.id });
        toast.success("Task deleted");
    }

    return (
        <Card className="transition-all">
            <CardHeader className="flex flex-row justify-between items-start">
                <div>
                    <CardTitle>{task.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
                <Badge 
                    variant={
                        task.status === "completed" 
                            ? "default" 
                            : isOverdue     
                                ? "destructive" 
                                : "secondary"
                    }
                >
                    {task.status === "completed" ? "Completed" : isOverdue ? "Overdue" : "Pending"}
                </Badge>
            </CardHeader>
            <CardContent className="flex justify-between items-center">
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

                    {/* Alert Dialog for Delete Confirmation */}
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                variant="destructive"
                                size="sm"
                                className="cursor-pointer"
                            >
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
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardContent>
        </Card>
    )
}

export default TaskCard;