import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar'
import { LayoutDashboard, ListChecks, PanelLeft, FilePlus, BadgeCheck, Hourglass, TimerOff } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import Logo from '../assets/Logo.png'
import { cn } from '@/lib/utils';

const AppSidebar = () => {
    const location = useLocation();
    const { toggleSidebar } = useSidebar()

    const navLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', to: '/' },
        { icon: ListChecks, label: 'Tasks', to: '/tasks' },
        { icon: FilePlus, label: 'Add Task', to: '/add-task' },
        { icon: BadgeCheck, label: 'Completed', to: '/completed' },
        { icon: Hourglass, label: 'Pending', to: '/pending' },
        { icon: TimerOff, label: 'Overdue', to: '/overdue' }
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
                        const isActive = location.pathname === link.to;

                        return (
                            <SidebarMenuItem
                                key={link.to}
                                className={cn(
                                    "group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:py-4 hover:bg-[#6C5CE7]/50 transition-all duration-300 ease-in-out",
                                    isActive && "bg-[#6C5CE7]/20"
                                )}
                            >
                                <SidebarMenuButton
                                    asChild
                                    size="lg"
                                    className={cn(
                                        "gap-4 p-8 hover:bg-[#6C5CE7]/50 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center rounded-none",
                                        !isActive && "text-gray-500"
                                    )}
                                >
                                    <Link
                                        to={link.to}
                                        className='relative flex items-center hover:bg-[#6C5CE7]/50'
                                    >
                                        <link.icon className={isActive ? "text-gray-700" : "text-gray-500"} />
                                        <span
                                            className={cn(
                                                "font-medium text-md ml-4 group-data-[collapsible=icon]:hidden",
                                                isActive ? "text-gray-700" : "text-gray-500"
                                            )}
                                        >
                                            {link.label}
                                        </span>
                                    </Link>
                                </SidebarMenuButton>
                                {isActive && <div className='absolute right-0 top-0 h-full w-[4px] bg-[#6C5CE7]/50' />}
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