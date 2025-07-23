import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import TaskCard from "./TaskCard";
import type { Task } from "@/context/taskTypes";
import { TaskContext } from "@/context/TaskContext";
import { BrowserRouter } from "react-router-dom";

const mockDispatch = jest.fn();

const mockTask: Task = {
    id: "1",
    title: "Test Task",
    description: "This is a test",
    dueDate: new Date().toISOString().split("T")[0],
    status: "pending",
    createdAt: "",
    priority: "low"
};

const renderComponent = () =>
    render(
        <BrowserRouter>
            <TaskContext.Provider value={{ dispatch: mockDispatch, tasks: [mockTask], filter: "all", loading: false, error: null }}>
                <TaskCard task={mockTask} />
            </TaskContext.Provider>
        </BrowserRouter>
    );

describe("TaskCard", () => {
    it("renders title and description", () => {
        renderComponent();
        expect(screen.getByText("Test Task")).toBeInTheDocument();
        expect(screen.getByText("This is a test")).toBeInTheDocument();
    });

    it("toggles task status when button clicked", () => {
        renderComponent();
        fireEvent.click(screen.getByText("Mark Done"));
        expect(mockDispatch).toHaveBeenCalledWith({ type: "TOGGLE_STATUS", payload: "1" });
    });

    it("opens and confirms delete dialog", () => {
        renderComponent();
        fireEvent.click(screen.getByText("Delete"));
        fireEvent.click(screen.getByText("Delete")); // inside dialog
        expect(mockDispatch).toHaveBeenCalledWith({ type: "DELETE_TASK", payload: "1" });
    });
});