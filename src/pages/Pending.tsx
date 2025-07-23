import TaskList from "@/components/shared/TaskList";

const PendingTasksPage = () => {
  return <TaskList filter="pending" title="Pending Tasks" />;
};

export default PendingTasksPage;