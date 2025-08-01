import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { getUserRole } from '@/lib/models/user/get-role';
import { SharedData, type NavItem } from '@/types';
import { Role } from '@/types/models';
import { Link, usePage } from '@inertiajs/react';
import { AtSign, IdCard, Users } from 'lucide-react';
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
];

export function AppSidebar() {
    const [userRole, setUserRole] = useState<Role['short']>('user');

    const { auth, token } = usePage<SharedData>().props;
    console.debug(auth);

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
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain label="Navegación" items={appNavItems} />

                {userRole === 'admin' && <NavMain label="Configuración" items={configNavItems} />}
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
