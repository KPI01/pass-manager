import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { getUserRole } from '@/lib/models/user/get-role';
import { SharedData, type NavItem } from '@/types';
import { Role } from '@/types/models';
import { Link, usePage } from '@inertiajs/react';
import { AtSign, FileText, IdCard, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import AppLogo from './app-logo';

const appNavItems: NavItem[] = [
    {
        title: 'Usuarios',
        href: '/register?entity=user',
        icon: Users,
    },
    {
        title: 'Correos',
        href: '/register?entity=email',
        icon: AtSign,
    },
];
const configNavItems: NavItem[] = [
    {
        title: 'Acceso',
        href: '/user',
        icon: IdCard,
    },
    {
        title: 'Logs',
        href: '/logs',
        icon: FileText,
    },
];

export function AppSidebar() {
    const [userRole, setUserRole] = useState<Role['short']>('user');

    const { auth, token } = usePage<SharedData>().props;

    useEffect(() => {
        getUserRole({ userId: auth.user.id, token }).then((data) => {
            if (data.role) setUserRole(data.role);
            return;
        });
    }, []);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/register" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain label="Navegación" items={appNavItems} />

                {userRole === 'admin' && <NavMain label="Avanzado" items={configNavItems} />}
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
