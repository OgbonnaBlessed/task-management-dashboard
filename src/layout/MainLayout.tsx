import { Outlet } from 'react-router-dom'
import AppSidebar from '../components/AppSidebar'

const MainLayout = () => {
    return (
        <div className="flex">
            <AppSidebar />
            <div className="flex-1 p-4">
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout