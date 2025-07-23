import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AppSidebar from "./AppSidebar";
import { MemoryRouter } from "react-router-dom";

describe("AppSidebar", () => {
    it("renders all sidebar links", () => {
        render(
            <MemoryRouter>
                <AppSidebar />
            </MemoryRouter>
        );

        expect(screen.getByText("Dashboard")).toBeInTheDocument();
        expect(screen.getByText("Tasks")).toBeInTheDocument();
        expect(screen.getByText("Add Task")).toBeInTheDocument();
        expect(screen.getByText("Completed")).toBeInTheDocument();
        expect(screen.getByText("Pending")).toBeInTheDocument();
        expect(screen.getByText("Overdue")).toBeInTheDocument();
    });
});