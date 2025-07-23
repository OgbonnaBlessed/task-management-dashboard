import TaskList from "@/components/shared/TaskList";

const CompletedTasksPage = () => {
  return <TaskList filter="completed" title="Completed Tasks" />;
};

export default CompletedTasksPage;