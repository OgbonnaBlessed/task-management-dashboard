import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar'
import { LayoutDashboard, ListChecks, CalendarClock, PanelLeft } from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.png'

const AppSidebar = () => {
    const { toggleSidebar } = useSidebar()
    const location = useLocation()

    const navLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
        { icon: ListChecks, label: 'Tasks', to: '/tasks' },
        { icon: ListChecks, label: 'Add Task', to: '/add-task' },
        { icon: CalendarClock, label: 'Completed', to: '/completed' },
        { icon: CalendarClock, label: 'Pending', to: '/pending' },
        { icon: CalendarClock, label: 'Overdue', to: '/overdue' }
    ]

    return (
        <Sidebar
            collapsible='icon'
            style={{ height: '100vh' }}
            className='bg-white border-none shadow-lg'
        >
            <SidebarHeader>
                <SidebarMenu className='mt-5 group-data-[collapsible=icon]:mt-7'>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            size='lg'
                            onClick={toggleSidebar}
                            className='group'
                        >
                            <div className='flex justify-between items-center gap-5 pl-3 pr-1 h-10 w-full group-data-[collapsible=icon]:ml-1 group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0 group'>
                                <img
                                    src={Logo}
                                    alt='logo'
                                    width={100}
                                    height={60}
                                    className='app-sidebar__logo'
                                />
                                <PanelLeft className='text-gray-400 w-5 h-5 group-data-[collapsible=icon]:hidden cursor-pointer' />
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className='mt-7 gap-0'>
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.to

                        return (
                            <SidebarMenuItem
                                key={link.to}
                                className='group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-4 hover:bg-[#6C5CE7]/20 transition-all duration-300 ease-in-out relative'
                            >
                                <SidebarMenuButton asChild size='lg' className='w-full'>
                                    <NavLink
                                        to={link.to}
                                        className={({ isActive }) =>
                                        `flex items-center gap-4 p-8 rounded-none w-full ${
                                            isActive
                                                ? 'bg-[#6C5CE7]/20 text-gray-900 font-semibold'
                                                : 'text-gray-500'
                                            } group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-3`
                                        }
                                    >
                                        <link.icon className='w-5 h-5' />
                                        <span className='group-data-[collapsible=icon]:hidden'>
                                            {link.label}
                                        </span>
                                    </NavLink>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                {/* You can add a Logout or Settings button later */}
            </SidebarFooter>
        </Sidebar>
    )
}

export default AppSidebar