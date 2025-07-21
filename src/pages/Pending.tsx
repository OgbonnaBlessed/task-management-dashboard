import TaskList from "@/components/TaskList";

const PendingTasksPage = () => {
  return <TaskList filter="pending" title="Pending Tasks" />;
};

export default PendingTasksPage;