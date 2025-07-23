import TaskList from "@/components/shared/TaskList";

const OverdueTasksPage = () => {
  return <TaskList filter="overdue" title="Overdue Tasks" />;
};

export default OverdueTasksPage;