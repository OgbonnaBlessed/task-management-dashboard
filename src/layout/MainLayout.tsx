import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'

const MainLayout = () => {
    return (
        <SidebarProvider>
            <div className="flex">
                <AppSidebar />
                <div className="flex-1 p-4">
                    <Outlet />
                </div>
            </div>
        </SidebarProvider>
    )
}

export default MainLayout