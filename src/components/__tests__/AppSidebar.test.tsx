/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from "vitest"
import { SidebarProvider } from '../ui/sidebar';

// Move all mocks to the top BEFORE importing AppSidebar
vi.mock('@/hooks/use-mobile', () => ({
  useIsMobile: () => false,
}));

vi.mock('@/lib/utils', () => ({
  cn: (...args: string[]) => args.filter(Boolean).join(' ')
}));

vi.mock('../../assets/Logo.png', () => ({
  default: 'logo.png',
}));

vi.mock('../ui/sidebar', async () => {
    const actual = await vi.importActual<any>('../ui/sidebar');
    return {
        ...actual,
        useSidebar: () => ({ toggleSidebar: vi.fn() }),
    };
});

// Dynamic mock for useLocation, controllable per test
let mockPathname = '/';
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom');
    return {
        ...actual,
        useLocation: () => ({ pathname: mockPathname }),
    };
});

// 👇 NOW import the component AFTER mocks
import AppSidebar from '../shared/AppSidebar';

const renderWithRouter = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <SidebarProvider>
                {ui}
            </SidebarProvider>
        </BrowserRouter>
    );
};

describe('AppSidebar', () => {
    it('renders logo and toggle button', () => {
        renderWithRouter(<AppSidebar />);
        const logo = screen.getByAltText(/logo/i);
        expect(logo).toBeInTheDocument();

        const toggleIcon = screen.getByRole('img', { hidden: true }); // SVG icon
        expect(toggleIcon).toBeInTheDocument();
    });

    it('renders all sidebar menu items', () => {
        renderWithRouter(<AppSidebar />);
        const menuLabels = ['Dashboard', 'Tasks', 'Add Task', 'Completed', 'Pending', 'Overdue'];
        menuLabels.forEach(label => {
            expect(screen.getByText(label)).toBeInTheDocument();
        });
    });

    it('navigates to the correct route on click', () => {
        renderWithRouter(<AppSidebar />);
        const dashboardLink = screen.getByText('Dashboard');
        expect(dashboardLink.closest('a')).toHaveAttribute('href', '/');
    });

    it('highlights the active route', () => {
        // 🔁 Simulate route being "/tasks"
        mockPathname = '/tasks';
        renderWithRouter(<AppSidebar />);
        
        const item = screen.getByTestId('menu-item-tasks');
        expect(item).toHaveClass('bg-[#6C5CE7]/20');
    });
});