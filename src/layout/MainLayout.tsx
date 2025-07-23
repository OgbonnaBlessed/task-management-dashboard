import { Outlet, useLocation } from 'react-router-dom'
import AppSidebar from '../components/shared/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import Navbar from '@/components/shared/Navbar'
import { useEffect, useState } from 'react'
import { TaskProvider } from '@/context/TaskContext'
import { Toaster } from "sonner";

const MainLayout = () => {
    const location = useLocation()
    const [pageTitle, setPageTitle] = useState('')

    useEffect(() => {
        const path = location.pathname;

        let title = 'Task Dashboard';

        if (path === '/') title = 'Dashboard';
        else if (path === '/tasks') title = 'Tasks';
        else if (path === '/add-task') title = 'Add Task';
        else if (path === '/completed') title = 'Completed Tasks';
        else if (path === '/pending') title = 'Pending Tasks';
        else if (path === '/overdue') title = 'Overdue Tasks';
        else if (path.startsWith('/edit/')) title = 'Edit Task';

        setPageTitle(title);
    }, [location.pathname]);

    return (
        <SidebarProvider>
            <TaskProvider>
                <div className="flex w-full">
                    <AppSidebar />
                    <div className="min-h-screen w-full flex flex-col transition-theme flex-1 relative">
                        <SidebarTrigger className='fixed top-12 left-5 bg-background/50 rounded-full'/>
                        <Navbar title={pageTitle} />
                        <main className="flex-1 w-full p-6 bg-background text-foreground transition-theme">
                            <Outlet />
                        </main>
                    </div>
                </div>
                <Toaster richColors closeButton position="bottom-right" />
            </TaskProvider>
        </SidebarProvider>
    )
}

export default MainLayout