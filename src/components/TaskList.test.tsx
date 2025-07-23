import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TaskList from "./TaskList";
import type { Task } from "@/context/taskTypes";
import { TaskContext } from "../context/TaskContext";

const mockDispatch = jest.fn();

const tasks: Task[] = [
    {
        id: "1",
        title: "Buy milk",
        description: "Grocery",
        dueDate: new Date().toISOString().split("T")[0],
        status: "pending",
        createdAt: "",
        priority: "low"
    },
    {
        id: "2",
        title: "Pay bills",
        description: "Electricity",
        dueDate: new Date().toISOString().split("T")[0],
        status: "completed",
        createdAt: "",
        priority: "low"
    },
];

type TaskFilter = "all" | "completed" | "pending" | "overdue";

const renderComponent = (filter: TaskFilter = "all") =>
    render(
        <TaskContext.Provider value={{ tasks, dispatch: mockDispatch, filter, loading: false, error: null }}>
            <TaskList filter={filter} />
        </TaskContext.Provider>
    );

describe("TaskList", () => {
    it("renders task titles", async () => {
        renderComponent();
        await waitFor(() => {
            expect(screen.getByText("Buy milk")).toBeInTheDocument();
            expect(screen.getByText("Pay bills")).toBeInTheDocument();
        });
    });

    it("filters completed tasks", async () => {
        renderComponent("completed");
        await waitFor(() => {
            expect(screen.getByText("Pay bills")).toBeInTheDocument();
            expect(screen.queryByText("Buy milk")).not.toBeInTheDocument();
        });
    });

    it("filters by search term", async () => {
        renderComponent();
        fireEvent.change(screen.getByPlaceholderText(/search/i), {
            target: { value: "milk" },
        });
        await waitFor(() => {
            expect(screen.getByText("Buy milk")).toBeInTheDocument();
            expect(screen.queryByText("Pay bills")).not.toBeInTheDocument();
        });
    });
});