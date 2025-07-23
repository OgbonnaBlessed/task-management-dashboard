import { useTaskContext } from "@/context/TaskContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, isToday, isAfter } from "date-fns";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
};

const Dashboard = () => {
  const { tasks } = useTaskContext();

  const total = tasks.length;
  const completed = tasks.filter(t => t.status === "completed").length;
  const pending = tasks.filter(t => t.status === "pending").length;
  const overdue = tasks.filter(t => t.status === "pending" && t.dueDate < new Date().toISOString().split("T")[0]).length;

  const todayTasks = tasks.filter(t => isToday(new Date(t.dueDate)));
  const upcomingTasks = tasks.filter(t => isAfter(new Date(t.dueDate), new Date()) && t.status === "pending");

  const chartData = [
    { name: "Completed", value: completed },
    { name: "Pending", value: pending },
    { name: "Overdue", value: overdue },
  ];

  const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // green, yellow, red

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Stats Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: "Total Tasks", value: total },
          { label: "Completed", value: completed },
          { label: "Pending", value: pending },
          { label: "Overdue", value: overdue },
        ].map((stat, i) => (
          <motion.div key={stat.label} variants={fadeIn} custom={i}>
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-md text-muted-foreground">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Chart Section */}
      <motion.div initial="hidden" animate="visible">
        <motion.h2 variants={fadeIn} custom={0} className="text-xl font-semibold mb-4">
          Task Overview
        </motion.h2>
        <motion.div variants={fadeIn} custom={1} className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-4">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      <Separator />

      {/* Today’s Tasks */}
      <motion.div initial="hidden" animate="visible">
        <motion.h2 variants={fadeIn} custom={0} className="text-xl font-semibold mb-4">
          Today’s Tasks
        </motion.h2>
        {todayTasks.length > 0 ? (
          <div className="grid gap-4">
            {todayTasks.map((task, i) => (
              <motion.div key={task.id} variants={fadeIn} custom={i + 1}>
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground break-words whitespace-pre-wrap max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md mb-2">
                      {task.description}
                    </p>
                    <p className="text-sm">Due: {format(new Date(task.dueDate), "PPP")}</p>
                    <p className="text-sm">Status: <span className={task.status === "completed" ? "text-green-600" : "text-yellow-600"}>{task.status}</span></p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p variants={fadeIn} custom={1} className="text-muted-foreground">
            No task due today
          </motion.p>
        )}
      </motion.div>

      <Separator />

      {/* Upcoming Tasks */}
      <motion.div initial="hidden" animate="visible">
        <motion.h2 variants={fadeIn} custom={0} className="text-xl font-semibold mb-4">
          Upcoming Tasks
        </motion.h2>
        {upcomingTasks.length > 0 ? (
          <div className="grid gap-4">
            {upcomingTasks.map((task, i) => (
              <motion.div key={task.id} variants={fadeIn} custom={i + 1}>
                <Card>
                  <CardHeader>
                    <CardTitle>{task.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground break-words whitespace-pre-wrap max-w-[250px] sm:max-w-xs md:max-w-sm lg:max-w-md mb-2">
                      {task.description}
                    </p>
                    <p className="text-sm">Due: {format(new Date(task.dueDate), "PPP")}</p>
                    <p className="text-sm">Priority: {task.priority}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.p variants={fadeIn} custom={1} className="text-muted-foreground">
            No upcoming task
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;